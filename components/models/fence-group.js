/**
 * @name: fence-group
 * @author: zhuhao
 * @data 2021/1/15 20:33
 * @description: 管理fence集合
 */
import {Matrix} from "./matrix";
import {Fence} from "./fence";

class FenceGroup{
    constructor(spu) {
        this.spu = spu
        this.sku_list = spu.sku_list
    }

    ininFences(){
        const matrix = this._createMatrix(this.sku_list)
        const fences = []
        let currentJ = -1;
        matrix.forEach((element,i,j) => {
            if (currentJ != j){
                currentJ = j
                //开启一个新列,创建一个fence
                fences[currentJ] = this._createFence(element)
            }
            fences[currentJ].pushValueTitle(element.value)
        })
        console.log(fences)
    }

    _createFence(element){
        const fence = new Fence()
        // fence.pushValueTitle(element.value)
        return fence
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