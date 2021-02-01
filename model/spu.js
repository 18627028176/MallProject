/**
 * @name: spu
 * @author: zhuhao
 * @data 2021/1/15 20:38
 * @description:
 */
import {Http} from "../utils/http";

class Spu{

    //无规格的spu
    static isNoSpec(spu){
       if (spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0){
            return true
       }
       return false
    }

     static async getDeteil(id){
        return await Http.request({
            url:`detail`,
            data:{
                id:id
            }
        })
    }
}

export {
    Spu
}