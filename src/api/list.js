import { post } from './axiosConfig';
export const listApi = {
    getGoodList: (data) => {//获取商品
        return post('/getGoodList',data)
    },
    addNewGood: (data) => {//添加新商品
        return post('/addNewGood',data)
    },
    editGood: (data) => {//编辑商品信息
        return post('/editGood',data)
    },
    delGood: (data) => {//删除商品
        return post('/delGood',data)
    },
}