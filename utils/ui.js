/**
 * @name: ui
 * @author: zhuhao
 * @data 2021/1/31 16:43
 * @description:
 */

const showToast = function (title) {
    wx.showToast({
        icon:"none",
        duration:2000,
        title
    })
}

export {
    showToast
}