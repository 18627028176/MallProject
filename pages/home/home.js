import {config} from "../../config/config";
import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";
import {SpuPaging} from "../../model/spu-paging";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiBaseUr:`${config.apiBaseUrl}`,
    themeA:null,
    themeE:null,
    themeF:null,
    thereESpu:[],
    bannerB:null,
    grid:[],
    activityD:null,
    bannerG:null,
    themeH:null,
    spuPaging:null,
    loadingType:'loading'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.initAllData()
    await this.initBottomSpuList()
  },

  async initBottomSpuList(){
    const paging = await SpuPaging.getLatestPaging()
    this.data.spuPaging = paging
    const data = await paging.getMoreDate()
    if (!data){
      return
    }
    //瀑布流 refresh参数是重置瀑布流，不需要可以默认省略
    wx.lin.renderWaterFlow(data.items)
  },

  async initAllData(){
    // const themeA = await Theme.getHomeLocaltionA()
    const bannerB = await Banner.getHomeLocationB()
    const grid = await Category.getHomeLocationC()
    const activityD = await Activity.getHomeLocationD()

    const themes = new Theme()
    await themes.getThemes()

    //对集合的操作  find,filter
    const themeA = themes.getHomeLocaltionA()
    const themeE = themes.getHomeLocaltionE()
    let thereESpu = []
    if (themeE.online){
      const data = await Theme.getHomeLocaltionESpu()
      if (data){
        thereESpu = data.spu_list.slice(0,8)
      }
    }
    const themeF = themes.getHomeLocaltionF()

    const bannerG = await Banner.getHomeLocationG()
    const themeH = await themes.getHomeLocaltionH()
    this.setData({
      themeA,
      themeE,
      themeF,
      thereESpu,
      bannerB:bannerB[0],
      grid,
      activityD,
      bannerG:bannerG[0],
      themeH
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const data = await this.data.spuPaging.getMoreDate()
    if (!data){
      return
    }
    wx.lin.renderWaterFlow(data.items)
    if (!data.moreData){
      this.setData({
        loadingType:'end'
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})