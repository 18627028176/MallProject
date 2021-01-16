/**
 * @name: paging
 * @author: zhuhao
 * @data 2021/1/11 22:31
 * @description: 分页工具
 */
import {Http} from "./http";
import boolean from "../miniprogram_npm/lin-ui/common/async-validator/validator/boolean";

class Paging{
    //第多少条数据，从0开始
    start
    //页大小
    count
    req
    url
    //请求锁 (防止多次请求）
    locker = false
    //第一次调用，moreData需要设置为true
    moreData = true
    accumulator =  []

     //要求，只调用getMoreDate就给我一组数据

    /**
     * 初始化Class，设置默认参数（相当于java类的构造函数）
     * @param url
     * @param count
     * @param start
     */
    constructor(req,count = 10,start=0) {
        this.req = req
        this.start = start
        this.count = count
        this.url = req.url
    }


    async getMoreDate(){
        if (!this.moreData){
            return
        }
        if (!this._getLoker()){
            return
        }
        const data = await this._actualGetData()
        this._releaseLocker()
        return data
    }

     async _actualGetData(){
        const req = await this._getCurrentReq()
        let pagingArray = await Http.request(req)
        let paging = pagingArray[0]
        if (!paging){
            return null
        }
         // return {
         //     //当前请求返回的结果
         //     empty: boolean,
         //     items:[],
         //     //历史请求返回的结果
         //     moreData:boolean,
         //     accumulator:[]
         // }
        if (paging.total === 0){
            return {
                empty:true,
                items: [],
                moreData:false,
                accumulator:[]
            }
        }

        this.moreData = Paging._moreData(paging.total_page,paging.page)
        if (this.moreData){
            this.start += this.count
        }
        this._accumlate(paging.items)
        return {
            empty: false,
            items: paging.items,
            moreData: this.moreData,
            accumulator: this.accumulator
        }
    }

    /**
     * 合并输出数据，组成一个历史数据
     * @param items
     * @private 当前请求数据
     */
    _accumlate(items){
        this.accumulator = this.accumulator.concat(items)
    }

    /**
     * 判断是否有下一页
      * @param totalPage 总页数
     * @param pageNum 当前页数
     * @private
     */
    static _moreData(totalPage,pageNum){
        return pageNum < totalPage-1
    }

    /**
     * 封装成一个req的请求参数集合
     * @returns {*}
     * @private
     */
    _getCurrentReq(){
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`
        //判断是否包含"?"
        if (url.includes('?')){
            url += '&' + params
        }else {
            url += '?' + params
        }
        //这里的url是值引用，不会改变this.url的数据
        this.req.url = url
        return this.req
    }

    //获取锁
    _getLoker(){
        if (this.locker){
            return false
        }
        this.locker = true
        return true
    }

    //释放锁
    _releaseLocker(){
        this.locker = false
    }
}

export {
    Paging
}