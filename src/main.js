import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import service from "./http"
import './assets/reset.css'
import dayjs from "dayjs"
import VCharts from 'v-charts'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import lodash from 'lodash'
import JsonExcel from 'vue-json-excel'

Vue.component('downloadExcel', JsonExcel)
    // use
Vue.use(mavonEditor)
Vue.prototype.$dayjs = dayjs
Vue.prototype.$lodash = lodash
Vue.use(ElementUI)
Vue.use(VCharts)

// 把service对象挂载在Vue的原型对象上
// 每一个组件都可以使用
Vue.prototype.$axios = service
Vue.config.productionTip = false


new Vue({
    // 'el': '#main',
    router,
    store,
    render: h => h(App)
}).$mount('#app')