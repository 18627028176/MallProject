/**
 * @name: categories
 * @author: zhuhao
 * @data 2021/1/26 21:29
 * @description: 一组分类数据
 */
import {Http} from "../utils/http";

class Categories{
    //一级分类
    roots = []
    //二级分类
    subs = []
    async getAll(){
        const data = await Http.request({
            url:`categories`
        })
        this.roots = data.roots
        this.subs = data.subs
    }

    getRoots(){
        return this.roots
    }

    getRoot(rootId){
        return this.roots.find(r => r.id==rootId)
    }

    getSubs(parentId){
        return this.subs.filter(sub => sub.parent_id == parentId)
    }


}

export {
    Categories
}