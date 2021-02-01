/**
 * @name: tag
 * @author: zhuhao
 * @data 2021/1/31 10:55
 * @description: 热门搜索的数据
 */
import {Http} from "../utils/http";

class Tag{
    static getSearchTags() {
        return Http.request({
            url:`tag`
        })
    }
}

export {
    Tag
}
