import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import service from "./http"

Vue.use(ElementUI)

// 把service对象挂载在Vue的原型对象上
// 每一个组件都可以使用
Vue.prototype.$axios = service
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')