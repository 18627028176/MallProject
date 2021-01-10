/**
 * @name: activity
 * @author: zhuhao
 * @data 2021/1/9 14:42
 * @description: 活动
 */
import {Http} from "../utils/http";

class Activity{
    static locationD = '2'
    static async getHomeLocationD(){
        return await Http.request({
            url:`activity`,
            data:{
                id:Activity.locationD
            }
        })
    }
}

export {
    Activity
}