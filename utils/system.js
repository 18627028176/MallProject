/**
 * @name: system
 * @author: zhuhao
 * @data 2021/1/26 19:39
 * @description: 获取系统的相关信息
 */
import {promisic} from "./util";

const getSystemSize = async function () {
    //使用promisic后必须加上参数符合，没有参数写（）
    const res = await promisic(wx.getSystemInfo)()
    return {
        windowHeight: res.windowHeight,
        windowWidth: res.windowWidth,
        screenWidth: res.screenWidth,
        screenHeight: res.screenHeight
    }
}

export {
    getSystemSize
}