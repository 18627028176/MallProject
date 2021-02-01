/**
 * @name: saleExpalin
 * @author: zhuhao
 * @data 2021/1/24 15:59
 * @description: 商品的补充信息（如：快递的信息，发货地等等）
 */
import {Http} from "../utils/http";

class SaleExpalin{
    static async getFixed(){
        const explains = await Http.request({
            url:`fixed`
        })
        return explains.map(e=>{
            return e.text
        })
    }
}

export {
    SaleExpalin
}