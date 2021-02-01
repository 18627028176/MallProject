// pages/search/search.js
import {HistoryKeyword} from "../../model/history-keyword";
import {Tag} from "../../model/tag";
import {Search} from "../../model/Search";
import {showToast} from "../../utils/ui";
const histtory = new HistoryKeyword()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const historyTags = histtory.get()
    const hotTags = await Tag.getSearchTags()
    this.setData({
      historyTags,
      hotTags
    })
  },

  async onSearch(event){
    this.setData({
      search:true,
      items:[]
    })
    //用户通过输入框输入为value,点击标签是name
    const keyword = event.detail.value || event.detail.name
    this.data.flag = false
    if (!keyword) {
      showToast('请输入关键字')
      return
    }
    histtory.save(keyword)
    this.setData({
      historyTags:histtory.get()
    })
    const paging = Search.search(keyword)
    wx.lin.showLoading({
      color:'#157658',
      type:'flash',
      fullScreen:true
    })
    const data = await paging.getMoreDate()
    wx.lin.hideLoading()
    this.bingItems(data)
  },

  onCancel(event){
    if (this.data.flag){
      wx.navigateBack();
      return
    }
    this.setData({
      flag:true,
      search:false,
      items:[]
    })
  },

  bingItems(data){
    if (data.accumulator.length !== 0){
      this.setData({
        items:data.accumulator
      })
    }

  },

  onDeleteHistory(event){
    histtory.clear()
    this.setData({
      historyTags:[]
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})