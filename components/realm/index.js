import {Fence} from "../models/fence";
import {FenceGroup} from "../models/fence-group";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  //也是一种监听数据的方式
  // lifetimes:{
  //   attached(){
  //
  //   }
  // },


  observers:{
    'spu':function (spu){
      if (!spu){
        return
      }
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.ininFences()
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {

  }
})
