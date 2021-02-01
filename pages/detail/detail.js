// pages/detail/detail.js
import {Spu} from "../../model/spu";
import {ShoppingWay} from "../../core/enum";
import {SaleExpalin} from "../../model/saleExpalin";
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util";
import {getSystemSize} from "../../utils/system";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRealm:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    //获取home页面的点击数据PID
    const pid = options.pid
    const spu = await Spu.getDeteil(pid)

    const explain = await SaleExpalin.getFixed()
    const res = await getSystemSize()
    //获取当前用户手机px转成rpx的数值
    const windowHeightRpx = px2rpx(res.windowHeight)
    const h = windowHeightRpx - 100
    this.setData({
      setHeight:h,
      spu,
      explain
    })
  },

  onGotoHome(event) {
    wx.switchTab({
      url:'/pages/home/home'
    })
  },

  onGotoCart(event) {
    wx.switchTab({
      url:'/pages/cart/cart'
    })
  },

  onAddToCart(event) {
    this.setData({
      showRealm:true,
      orderWay:ShoppingWay.CART
    })
  },

  onBuy(event) {
    this.setData({
      showRealm:true,
      orderWay:ShoppingWay.BUY
    })
  },

  //接受realm传达的值,封装成specs传给页面骨架
  onSpecChange(event){
    this.setData({
      specs:event.detail
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})