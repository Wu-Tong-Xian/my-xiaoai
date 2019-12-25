// import { ADD_NUM, DEL_NUM, SET_NUM, GET_CITY } from './mutation-types'

export default {
    // 都是方法
    // 可以传两个参数 第一个是state 就是state.js当中的state
    // 第二个参数可以不传的 传了之后 就是代表state改变之后的数据
    ['SET_NUM'](state, data) {
        state.num = data
    },
    ['ADD_NUM'](state) {
        state.num += 1
    },
    ['DEL_NUM'](state) {
        state.num -= 2
    },
    ['GET_CITY'](state, data) {
        state.citys = data
    }
}