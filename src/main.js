import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'assets/styles/iconfont.css'
import 'assets/styles/reset.css'
import store from './store'

import fastclick from 'fastclick'//解决移动端三百秒延时
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 


import moment from 'moment'

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)

})


//input聚焦
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
