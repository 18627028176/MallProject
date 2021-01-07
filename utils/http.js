import {config} from "../config/config";
import {promisic} from "./util";

/**
 * @name: http
 * @author: zhuhao
 * @data 2021/1/6 15:09
 * @description:
 */
class Http{
    static async request({url, data, method = 'GET'}) {
        const res = await promisic(wx.request)({
            url:`${config.apiBaseUrl}${url}`,
            data,
            method,
            header: {
                appkey: config.appkey
            }
            // success(res) {
            //     callback(res.data)
            // }
        })
        return res.data
    }
}

export {
    Http
}