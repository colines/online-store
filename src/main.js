// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './../src/store/store'
// import VueResource from 'vue-resource'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import './assets/styles/reset.css'
import './assets/styles/iconfont.css'
import 'swiper/dist/css/swiper.css'
import './assets/styles/common.css'

// Vue.use(VueResource)
axios.defaults.withCredentials = true//解决sessionId不一致问题：跨域共享session
Vue.prototype.$qs = qs
Vue.config.productionTip = false
// Vue.http.options.emulateJSON = true;
// Vue.prototype.$axios = axios//全局挂载axios

Vue.prototype.Home = 'http://112.74.39.181:1452'//如果使用这个全局路径，在发送请求的时候每次都要加上

Vue.prototype.Img = 'http://112.74.39.181:1453/img/'//图片访问的路径
Vue.use(VueAxios,axios)//axios结合vue-axios使用

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
