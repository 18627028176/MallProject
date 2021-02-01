/**
 * @name: judger
 * @author: zhuhao
 * @data 2021/1/17 21:35
 * @description: 判断每个cell的状态（是否存在）
 */
import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";
import {Cell} from "./cell";

class Judger{

    fenceGroup
    //所有选择的目录
    pathDict=[]
    skuPending

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initPathDict()
        this._initSkuPending()
    }

    isSkuIntact(){
        return this.skuPending.isIntact()
    }

    getCurrentValues(){
        return this.skuPending.getCurrentSpecValues()
    }

    getMissingKeys(){
        const missingKeysIndex = this.skuPending.getMissingSpecKeysIndex()
        return missingKeysIndex.map(i => {
            return this.fenceGroup.fences[i].title
        })

    }

    _initSkuPending(){
        const specsLength = this.fenceGroup.fences.length
        this.skuPending = new SkuPending(specsLength)
        const defaultSku = this.fenceGroup.getDefaultSku()
        if (!defaultSku){
            return
        }
        //将默认的sku插入skuPending中
        this.skuPending.init(defaultSku)
        this.skuPending.pending.forEach(cell => {
            //将默认的sku改成已选中的状态
            this.fenceGroup.setCellStatusById(cell.id,CellStatus.SELECTED)
        })
        this.judge(null,null,null,true)
    }

    _initPathDict() {
        this.fenceGroup.spu.sku_list.forEach(s=>{
            //获取整个spu里sku的code可能出现的情况
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
    }

    //默认值设置为false，其他调用者不需要添加isInit参数
    judge(cell,x,y,isInit=false){
        if (!isInit){
            this._changeCurrentCellStatus(cell,x,y)
        }
        //这个地方使用this会出现指向错误的问题，需要使用箭头函数
        // this.fenceGroup.eachCell(this._findPotentialPath)这个是错误的写法
        this.fenceGroup.eachCell((cell,x,y) => {
            const path = this._findPotentialPath(cell, x, y)
            const isIn = this._isInDict(path)
            if (!this.skuPending.isSelected(cell,x)){
                if (isIn){
                    this.fenceGroup.setCellStatusByXY(x,y,CellStatus.WAITING)
                }else {
                    this.fenceGroup.setCellStatusByXY(x,y,CellStatus.FORBIDDEN)
                }
            }
        })
    }

    getDeterminateSku(){
        const code = this.skuPending.getSkuCode()
        return this.fenceGroup.getSku(code)
    }

    _isInDict(path){
        return this.pathDict.includes(path)
    }

    // _changeOtherCellStatus(cell, x, y){
    //     console.log(this)
    //     const path = this._findPotentialPath(cell, x, y)
    //     console.log(path)
    // }

    //查找当前cell的潜在路径
    _findPotentialPath(cell, x, y){
        const joiner = new Joiner('#')
        for (let i=0; i<this.fenceGroup.fences.length; i++){
            //用什么字符拼接
            const selected = this.skuPending.findSelectCellByX(i)
            if (x === i){
                //当前行
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            }else {
                //其他行
                if (selected){
                    const SelectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(SelectedCellCode)
                }
            }
        }
        return joiner.getStr()
    }

    _getCellCode(spec){
        return spec.key_id + '-' + spec.value_id
    }

    _changeCurrentCellStatus(cell,x,y){
        if (cell.status === CellStatus.WAITING){
            this.fenceGroup.setCellStatusByXY(x,y,CellStatus.SELECTED)
            this.skuPending.insertCell(cell,x)
        }
        //这里还有一种不可选的状态，所有不能用else
        if (cell.status === CellStatus.SELECTED){
            this.fenceGroup.setCellStatusByXY(x,y,CellStatus.WAITING)
            this.skuPending.removeCell(x)
        }

    }
}

export {
    Judger
}