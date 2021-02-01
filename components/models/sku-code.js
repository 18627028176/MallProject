/**
 * @name: sku-code
 * @author: zhuhao
 * @data 2021/1/17 21:43
 * @description: 拆解sku的code
 */
import {combination} from "../../utils/util";

class SkuCode{
    code
    spuId
    //保存当前sku的code所有的组合
    totalSegments = []
    constructor(code) {
        this.code = code
        this._splitToSegments()
    }

    //code：2$1-45#3-10#4-15 拆解
    _splitToSegments(){
        const spuAndSpec = this.code.split('$')
        this.spuId = spuAndSpec[0]
        const specCodeArray = spuAndSpec[1].split("#")
        const length = specCodeArray.length

        for (let i=1;i<length+1;i++){
            //排列组合(size表示选几个),这里最少要从数组里选1，所有i从1开始
            const segments = combination(specCodeArray,i)
            //segments返回的是一个二维数组，元素需要用"#"串联,
            const newSegments = segments.map(segs=>{
                return  segs.join('#')
            })
            this.totalSegments = this.totalSegments.concat(newSegments)
        }

    }
}

export {
    SkuCode
}