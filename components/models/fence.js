/**
 * @name: fance
 * @author: zhuhao
 * @data 2021/1/15 20:26
 * @description: sku的一行特性（一行规格或图案等等）
 */
import {Cell} from "./cell";

class Fence{
    cells = []
    specs
    title
    id

    constructor(specs) {
        //传入统一规格的一组数据（比如：颜色）
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
    }

    init(){
        this._initCells()
    }

    _initCells(){
        this.specs.forEach(s=>{
            //去掉重复的cell
            const existed = this.cells.some(c=>{
                return c.id === s.value_id
            })
            if (existed){
                return
            }
            const cell = new Cell(s)
            this.cells.push(cell)
        })
    }

    setFenceSketch(skuList){
        this.cells.forEach(c => {
            this._setCellSkuImg(c,skuList)
        })
    }

    _setCellSkuImg(cell,skuList){
        const specCode = cell.getCellCode()
        //能够匹配的sku,有可视化规格
        const matchedSku = skuList.find(c => c.code.includes(specCode))
        if (matchedSku){
            cell.skuImg = matchedSku.img
        }
    }

    // pushValueTitle(title){
    //     this.valueTitles.push(title)
    // }
}

export {
    Fence
}