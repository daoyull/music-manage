import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/Login.vue'], resolve)
    },
    {
      path: '/Home',
      component: resolve => require(['../components/Home.vue'], resolve),
      children: [
        {
          path: '/Info',
          component: resolve => require(['../pages/InfoPage.vue'], resolve)
        },
        {
          path: '/Singer',
          component: resolve => require(['../pages/SingerList.vue'], resolve)
        },
        {
          path: '/SingerList',
          component: resolve => require(['../pages/SingerList.vue'], resolve)
        },
        {
          path: '/SingerInsert',
          component: resolve => require(['../pages/SingerInsert.vue'], resolve)
        }
      ]
    }

  ]
})
