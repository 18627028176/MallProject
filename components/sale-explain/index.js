// components/sale-explain/index.js
import date from "../../miniprogram_npm/lin-ui/common/async-validator/validator/date";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    texts:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    _texts:Array
  },

  //外部通过属性传值给组件，setDate的值不能与之相同，否则就是死循环，这里使用_text
  observers:{
    'texts':function (texts){
      this.setData({
        _texts:texts
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
