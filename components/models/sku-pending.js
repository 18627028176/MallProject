import {CellStatus} from "../../core/enum";
import {Cell} from "./cell";
import {Joiner} from "../../utils/joiner";

/**
 * @name: sku-pending
 * @author: zhuhao
 * @data 2021/1/19 21:27
 * @description: 存储被选中的cell
 */
class SkuPending{
    //按照顺序存cell
    pending = []
    size

    constructor(size) {
        this.size =size
    }

    init(sku) {
        //在有默认sku的情况下，初始化pending可能sku.specs.length为0
        // this.size = sku.specs.length
        for (let i=0;i<sku.specs.length;i++){
            const cell = new Cell(sku.specs[i])
            this.insertCell(cell,i)
        }
    }

    getCurrentSpecValues(){
        const values = this.pending.map(cell => {
            if (cell){
                return cell?cell.spec.value:null
            }
        })
        return values
    }

    getMissingSpecKeysIndex(){
        const keyIndex = []
        for (let i = 0; i < this.size; i++) {
            if (!this.pending[i]){
                keyIndex.push(i)
            }
        }
        return keyIndex
    }

    getSkuCode(){
        const joins = new Joiner("#")
        this.pending.forEach(cell => {
            const cellCode = cell.getCellCode()
            joins.join(cellCode)
        })
        return joins.getStr()
    }

    //用户是否确认了完整的sku
    isIntact(){
        //只有全部规格选中才能算一个sku，所有size等于pending的长度是必备条件，检查pending数组是否完整
        for (let i = 0;i < this.size;i++){
            if (this._isEmptyPart(i)){
                return false
            }
        }
        return true
    }

    //判断pending数组下的每个元素是否有值
    _isEmptyPart(index){
        return this.pending[index]?false:true
    }

    insertCell(cell,x){
        this.pending[x] = cell
    }

    removeCell(x){
        this.pending[x] = null
    }

    findSelectCellByX(x){
        return this.pending[x]
    }

    isSelected(cell,x){
        const pendingCell = this.pending[x]
        if (!pendingCell) {
            return false
        }
        if (cell.status !== CellStatus.SELECTED){
            return false
        }
        return cell.id === pendingCell.id

    }

}

export {
    SkuPending
}