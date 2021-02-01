/**
 * @name: fence-group
 * @author: zhuhao
 * @data 2021/1/15 20:33
 * @description: 管理fence集合
 */
import {Matrix} from "./matrix";
import {Fence} from "./fence";
import {CellStatus} from "../../core/enum";

class FenceGroup{
    /**
     * 完成以下目标(顺序无关)
     *************************                    *************************
     * 金属灰 七龙珠 小号 S     *    行列互换         * 金属灰 青芒色 青芒色 橘黄色      *
     * 青芒色 灌篮高手 中号 M    *  ========>>>      * 七龙珠 灌篮高手 圣斗士 七龙珠    *
     * 青芒色 圣斗士 大号 L     *                   *  小号 S 中号 M 大号 L 小号 S    *
     * 橘黄色 七龙珠 小号 S     *                    *                             *
     * **********************                     * **********************
     * @param spu.sku_list
     */

    spu
    skuList = []
    fences = []

    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }

    //获取默认的sku
    getDefaultSku(){
        const defaultSkuId = this.spu.default_sku_id
        if (!defaultSkuId){
            return
        }
        return this.skuList.find(s => s.id === defaultSkuId)
    }

    setCellStatusById(cellId,status){
        this.eachCell((cell) => {
            if (cell.id===cellId){
                cell.status = status
            }
        })
    }

    //判断用户点击的skuCode是否完整
    getSku(skuCode){
        const fullSkuCode = this.spu.id + '$' + skuCode
        const sku = this.spu.sku_list.find(s => s.code === fullSkuCode)
        //sku存在返回sku，不存在返回null
        return sku?sku:null
    }

    setCellStatusByXY(x,y,status){
        this.fences[x].cells[y].status = status
    }

    //将sku生成一个二维数组，以列（j）为基础，生成一列一列的数据（fence）
    initFences1(){
        const matrix = this._createMatrix(this.sku_list)
        const fences = []
        let currentJ = -1;
        matrix.each((element,i,j) => {
            if (currentJ != j){
                currentJ = j
                //开启一个新列,创建一个fence
                fences[currentJ] = this._createFence(element)
            }
            fences[currentJ].pushValueTitle(element.value)
        })
    }

    //使用倒置的方式实现功能，这方式可以使fence对象整体倒置，以对象的角度考虑，推荐使用这种
    initFences() {
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        const at =matrix.transpose()
        at.forEach(r=>{
            const fence = new Fence(r)
            fence.init()
            if (this._hasSketchFence() && this._isSketchFence(fence.id)){
                fence.setFenceSketch(this.skuList)
            }
            fences.push(fence)
        })
        this.fences = fences
    }

    _hasSketchFence(){
        return this.spu.sketch_spec_id?true:false
    }

    //是否使用可视规格
    _isSketchFence(fenceId){
        return this.spu.sketch_spec_id === fenceId?true:false
    }

    // _createFence(element){
    //     const fence = new Fence()
    //     // fence.pushValueTitle(element.value)
    //     return fence
    // }

    //遍历每一个cell
    eachCell(cb) {
        for (let i = 0;i < this.fences.length; i++){
            for (let j = 0;j < this.fences[i].cells.length; j++){
                const cell = this.fences[i].cells[j]
                cb(cell,i,j)
            }
        }
    }

    _createMatrix(skuList) {
        //定义一个二维数组(矩阵)
        const m = []
        skuList.forEach(sku=>{
            m.push(sku.specs)
        })
        return new Matrix(m)
    }
    // 有两种办法可以实现这种做法
    // 1.数学函数库（转置或者旋转90°） 引入库存比较大
    // 2.不用借助矩阵思维
}

export {
    FenceGroup
}