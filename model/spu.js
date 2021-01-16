/**
 * @name: spu
 * @author: zhuhao
 * @data 2021/1/15 20:38
 * @description:
 */
import {Http} from "../utils/http";

class Spu{
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