// 类似计算属性
// getters里面都是一个方法 里面有一个参数 state 也是代表state里面的数据
// getters也是一定要return
export default {
    addNum(state) {
        return state.num + 100
    }
}