// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cell:Object,
    x:Number,
    y:Number
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
    onTap(event) {
      //需要将用户点击的cell的行列号传给realm
      //监听组件被点击，触发事件（绕过fence直接传值给realm
      this.triggerEvent('celltap',{
        //子组件向父组件传值（可以跨级转递）
        cell:this.properties.cell,
        x:this.properties.x,
        y:this.properties.y
      },{
        //bubbles开启冒泡传递，composed跨越组件的边界，只有两个同时开启才能实现跨级传递
        bubbles:true,
        composed:true
      })
    }
  }
})
