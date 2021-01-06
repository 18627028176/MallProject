import {config} from "../config/config";

/**
 * @name: http
 * @author: zhuhao
 * @data 2021/1/6 15:09
 * @description:
 */
class Http{
    static request({url, data, callback, method = 'GET'}) {
        wx.request({
            url:`${config.apiBaseUrl}${url}`,
            data,
            method,
            header: {
                appkey: config.appkey
            },
            success(res) {
                callback(res.data)
            }
        })
    }
}

export {
    Http
}