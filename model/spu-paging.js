/**
 * @name: spu
 * @author: zhuhao
 * @data 2021/1/11 22:15
 * @description:
 */
import {Paging} from "../utils/paging";

//分页需要考虑的点：1.数据为空
//2.最后一页，没有更多的数据
//3.累加（瀑布流需要累加的数据）
class SpuPaging{
    static getLatestPaging(){
        return new Paging({
            url:`spu`
        },3)
    }
}

export {
    SpuPaging
}