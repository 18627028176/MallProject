/**
 * @name: history-keyword
 * @author: zhuhao
 * @data 2021/1/28 21:11
 * @description: 返回历史搜索的数据
 */
class HistoryKeyword{
//    保持全局只有这个应该HistoryKeyword
    static MAX_ITEM_COUNT = 20
    static KEY = 'keywords'
    keywords = []

    constructor() {
        //单例模式
        if (typeof HistoryKeyword.instance === 'Object'){
            return HistoryKeyword.instance
        }
        this.keywords = this._getLocalKeywords()
        HistoryKeyword.instance = this
        return this
    }

    //保存历史搜索的关键字
    save(keyword){
        const items = this.keywords.filter(k=>{
            return k === keyword
        })
        if (items.length !== 0){
            this.keywords.splice(this.keywords.findIndex(index => index === items[0]),1)
            this.keywords.unshift(keyword)
            this._refreshLocal()
            return
        }
        if (this.keywords.length >= HistoryKeyword.MAX_ITEM_COUNT){
            this.keywords.pop()
        }
        //unshift加入数组的头部
        this.keywords.unshift(keyword)
        this._refreshLocal()
    }

    get() {
        return this.keywords
    }

    clear(){
        this.keywords = []
        this._refreshLocal()
    }

    //存入微信小程序的缓存
    _refreshLocal(){
        wx.setStorageSync(HistoryKeyword.KEY, this.keywords);
    }

    _getLocalKeywords(){
        const keywords = wx.getStorageSync(HistoryKeyword.KEY)
        if (!keywords){
            wx.setStorageSync(HistoryKeyword.KEY, []);
            return []
        }
        return keywords
    }
}

export {
    HistoryKeyword
}