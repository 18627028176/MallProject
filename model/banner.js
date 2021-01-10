/**
 * @name: banner
 * @author: zhuhao
 * @data 2021/1/7 9:53
 * @description: 广告
 */
import {Http} from "../utils/http";

class Banner {
    static locationB = 'b-1'
    static locationG = 'b-2'
    static async getHomeLocationB(){
        return await Http.request({
            url:`banner`,
            data:{
                name:Banner.locationB
            }
        })
    }

    static async getHomeLocationG(){
        return await Http.request({
            url:`banner`,
            data:{
                name:Banner.locationG
            }
        })
    }
}

export {
    Banner
}