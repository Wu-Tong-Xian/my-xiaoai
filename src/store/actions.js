// import {GET_CITY} from './mutation-types'
import axios from '../http'

// action定义的方法也有一个参数 它是整个store对象
export default {
    async getCity({ commit }) {
        let res = await axios.req("api/Showtime/HotCitiesByCinema.api")
        console.log(res)
        commit('GET_CITY', res)
    }
}