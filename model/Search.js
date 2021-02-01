/**
 * @name: Search
 * @author: zhuhao
 * @data 2021/1/31 11:27
 * @description: 搜索请求
 */
import {Paging} from "../utils/paging";

class Search{
    static search(q){
        return new Paging({
            url:`search?q=${q}`
        })
    }

}

export {
    Search
}