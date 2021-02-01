import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {Spu} from "../../model/spu";
import {Cell} from "../models/cell";
import {Cart} from "../../model/cart";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu:Object,
    orderWay:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    judger:Object,
    previewImg:String,
    currentSkuCount:Cart.SKU_MIN_COUNT
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
      //无规格的spu
      if (Spu.isNoSpec(spu)){
        this.processNoSpec(spu)
      } //有规格的spu
      else {
        this.processHasSpec(spu)
      }
      this.triggerSpecEvent()
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    processNoSpec(spu) {
      this.setData({
        noSpec:true
      })
      this.bindSkuData(spu.sku_list[0])
      this.setStockStatus(spu.sku_list[0].stock)
    },

    processHasSpec(spu) {
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      const judger = new Judger(fenceGroup)
      this.data.judger = judger

      const defaultSku = fenceGroup.getDefaultSku()
      if(defaultSku){
        this.bindSkuData(defaultSku)
        this.setStockStatus(defaultSku.stock)
      }
      else{
        this.bindSpuData()
      }
      this.bindTipData()
      this.bindFenceGroupData(fenceGroup)
    },

    //将realm的数据传个详情页(detail)，做请选择规格模块
    triggerSpecEvent(){
      const noSpec = Spu.isNoSpec(this.properties.spu)
      if (noSpec){
        this.triggerEvent('specchange',{
          noSpec
        })
      }else {
        this.triggerEvent('specchange',{
          onSpec:Spu.isNoSpec(this.properties.spu),
          skuIntact:this.data.judger.isSkuIntact(),
          currentValues:this.data.judger.getCurrentValues(),
          missingKeys:this.data.judger.getMissingKeys()
        })
      }
    },


    bindSpuData(){
      const spu = this.properties.spu
      this.setData({
        previewImg:spu.img,
        title:spu.title,
        price:spu.price,
        discountPrice:spu.discount_price,
        //用户是否确认了sku
      })
    },
    bindSkuData(sku){
      this.setData({
        previewImg:sku.img,
        title:sku.title,
        price:sku.price,
        discountPrice:sku.discount_price,
        stock:sku.stock,
      })
    },

    //用户是否已选规格
    bindTipData(){
      this.setData({
        skuIntact:this.data.judger.isSkuIntact(),
        currentValues:this.data.judger.getCurrentValues(),
        missingKeys:this.data.judger.getMissingKeys()
      })
    },

    bindFenceGroupData(fenceGroup) {
      this.setData({
        fences:fenceGroup.fences,
      })
    },

    setStockStatus(stock) {
      this.setData({
        outStock:this.isOutOfStock(stock,this.data.currentSkuCount)
      })
    },

    /**
     * 判断是否缺货
     * @param stork sku库存量
     * @param currentCount 用户选择的购买量
     * @returns {boolean}
     */
    isOutOfStock(stork,currentCount){
      return stork < currentCount
    },

    onSelectCount(event){
      const currentCount = event.detail.count
      this.data.currentSkuCount = currentCount
      if (this.data.judger.isSkuIntact()){
        const sku = this.data.judger.getDeterminateSku()
        this.setStockStatus(sku.stock)
      }

    },

    onCellTap(event){
      const data = event.detail.cell
      const x = event.detail.x
      const y = event.detail.y

      const cell = new Cell(data.spec)
      //新创建的cell的status默认就是WAITING,状态不对
      cell.status = data.status
      const judger = this.data.judger
      judger.judge(cell,x,y)
      const skuIntact = judger.isSkuIntact()
      if (skuIntact){
        //产生了一个完整的sku
        const currentSku = judger.getDeterminateSku()
        this.bindSkuData(currentSku)
        this.data.stock = currentSku.stock
        this.setStockStatus(currentSku.stock)
      }
      this.bindTipData()
      this.bindFenceGroupData(judger.fenceGroup)
      this.triggerSpecEvent()
    }
  }
})
