import {getSystemSize} from "../../utils/system";
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util";
import {Categories} from "../../model/categories";
import {SpuListType} from "../../core/enum";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:Object,
    defaultRootId:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.initCategoryData()
    await this.setDynamicSegmentHeight()
  },

  async initCategoryData(){
    const categories =  new Categories()
    this.data.categories = categories
    await categories.getAll()
    const roots = categories.getRoots()
    const defaultRoot = this.getDefaultRoot(roots)
    const currentSubs = categories.getSubs(defaultRoot.id)

    this.setData({
      roots,
      currentSubs,
      currentBannerImg:defaultRoot.img
    })
  },

  getDefaultRoot(roots){
    let defaultRoot = roots.find(r =>  r.id === this.data.defaultRootId)
    if (!defaultRoot){
      defaultRoot = roots[0]
    }
    return defaultRoot
  },

  async setDynamicSegmentHeight(){
    const res = await getSystemSize()
    //获取当前用户手机px转成rpx的数值
    const windowHeightRpx = px2rpx(res.windowHeight)
    //屏幕可用高度（排除顶部的微信，和底部的tab-ber） - 搜索按钮的高度60 - 20的间距 - 2rpx的白线
    const h = windowHeightRpx - 60 - 20 - 2
    this.setData({
      setHeight:h
    })
  },

  onJumpToSpuList(event){
    const cid = event.detail.cid
    wx.navigateTo({
      url: `/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
    })
  },

  onSegChange(event){
    const rootId = event.detail.activeKey
    const currentSubs = this.data.categories.getSubs(rootId)
    const currentRoot = this.data.categories.getRoot(rootId)
    this.setData({
      currentSubs,
      currentBannerImg:currentRoot.img
    })

  },

  onGotoSearch(event){
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})