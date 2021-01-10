/**
 * @name: category
 * @author: zhuhao
 * @data 2021/1/7 19:12
 * @description:
 */
import {Http} from "../utils/http";

class Category {
    static async getHomeLocationC(){
        return await Http.request({
            url:`category`
        })
    }
}

export {
    Category
}