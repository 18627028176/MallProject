/**
 * @name: cell
 * @author: zhuhao
 * @data 2021/1/16 20:57
 * @description: fence的一个元素，最小单元
 */
import {CellStatus} from "../../core/enum";

class Cell{
    title
    id
    status
    spec
    skuImg

    constructor(spec) {
        this.title = spec.value
        this.id = spec.value_id
        this.spec = spec
    }

    getCellCode(){
        return this.spec.key_id + '-' + this.spec.value_id
    }

}

export {
    Cell
}