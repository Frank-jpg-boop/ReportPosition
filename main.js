import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

 
import store from './store'
Vue.prototype.$store = store
import Request from './plugins/request/js/index'
import api from './api/request.js'
// 全局拦截器
global.$http = Request();
// 全局请求
Vue.prototype.$api = api

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

const app = new Vue({
	store,
    ...App
})
app.$mount()
