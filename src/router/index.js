import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index'
import Search from 'components/search'
import SearchCity from 'components/searchCity'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect: '/index'
    },{
      path: '/index',
      name: 'index',
      component: Index,
    },{
      path: '/search',
      name: 'search',
      component: Search,
    },{
      path: '/searchCity',
      name: 'searchCity',
      component: SearchCity,
    },
  ]
})
