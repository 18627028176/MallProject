import {Http} from "../utils/http";

/**
 * @name: theme.js
 * @author: zhuhao
 * @data 2021/1/6 14:52
 * @description: 主题
 */
export class Theme{
   static async getHomeLocaltionA() {
       return await Http.request({
           url:`themes`,
           data: {
               id:1
           }
       })
   }
}
