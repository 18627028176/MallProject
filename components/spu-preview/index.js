// components/spu-preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },

  data:{
    tags:Array
  },

  //监听，将tags字符串拆成数组
  observers:{
    data:function (data){
      if (!data){
        return
      }
      if (!data.tags){
        return
      }
      const tags = data.tags.split('$')
      this.setData({
        tags
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemTap(event){
      const pid = event.currentTarget.dataset.pid
      // 微信小程序路由跳转
      wx.navigateTo({
        url:`/pages/detail/detail?pid=${pid}`
      })
   }
  }
})



