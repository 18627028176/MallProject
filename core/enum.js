/**
 * @name: enum
 * @author: zhuhao
 * @data 2021/1/18 20:34
 * @description: 枚举类
 */
const CellStatus = {
    //禁用状态
    FORBIDDEN:'forbidden',
    //选中状态
    SELECTED:'selected',
    //可选状态
    WAITING:'waiting'
}

const ShoppingWay = {
    //购物车状态
    CART:'cart',
    //立即购买状态
    BUY:'buy'
}

const SpuListType={
    //显示一个主题的数据
    THEME: 'theme',
    //显示一级分类的所有数据
    ROOT_CATEGORY: 'root_category',
    //显示二级分类的所有数据
    SUB_CATEGORY: 'sub_category',
    //显示最新的数据
    LATEST:'latest'
}

export {
    CellStatus,
    ShoppingWay,
    SpuListType
}