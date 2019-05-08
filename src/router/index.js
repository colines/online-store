import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Detail from '@/pages/detail/Detail'
import Cart from '@/pages/cart/Cart'
import Order from '@/pages/order/Order'
import OrderList from '@/pages/order/compoments/OrderList'
import Address from '@/pages/order/compoments/Address'
import Password from '@/pages/order/compoments/Password'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import Buy from '@/pages/buy/Buy'
import Pay from '@/pages/pay/Pay'
import Search from '@/pages/search/Search'

Vue.use(Router)

const router =  new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        title:'网上商城'
      }
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
      meta:{
        title:'商品详情'
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      meta:{
        title:'购物车'
      }
    },
    {
      path: '/buy',
      name: 'Buy',
      component: Buy,
      meta:{
        title:'商品购买'
      }
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay,
      meta:{
        title:'商品支付'
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      children: [
      {
        path: '/order',
        name:'OrderList',
        component:OrderList,
        meta:{
          title:'我的订单'
        },
      },
      {
        path: 'address',
        name:'Address',
        component:Address,
        meta:{
          title:'地址管理'
        },
      },
      {
        path: 'password',
        name:'Password',
        component:Password,
        meta:{
          title:'密码管理'
        },
      }
    ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta:{
        title:'商品搜索'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        title:'登录'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta:{
        title:'注册'
      }
    },
  ]
})
  router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
 })

 export default router;
