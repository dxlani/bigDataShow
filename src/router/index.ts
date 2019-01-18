import Vue from 'vue'
import Router from 'vue-router'

import home1 from '../views/home1/home1.vue'
import slide1 from '../views/slide/slide1.vue'
import slide2 from '../views/slide/slide2.vue'
import slide3 from '../views/slide/slide3.vue'

declare var $:any;
Vue.use(Router)


 const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home'
      }
    },
    {
      path: '/home',
      name:'home',
      component: resolve => require(['../views/home/home'],resolve),
      meta:{title: '大数据',requireAuth: false},
    },
    // {
    //   path:'/home1',
    //   component: home1,
    //   children:[
    //         {
    //         path: 'slide1',
    //         component: slide1,
    //         meta:{title: 'slide1',requireAuth: true},
    //         },
    //         {
    //         path: 'slide2',
    //         component: slide2,
    //         meta:{title: 'slide2',requireAuth: true},
    //         },
    //         {
    //         path: 'slide3',
    //         component: slide3,
    //         meta:{title: 'slide3',requireAuth: true},
    //         },
    //     ]
    // }, 
    {
      path:'/home1',
      component: resolve => require(['../views/home1/home1'],resolve),
      children:[
            {
            path: 'slide1',
            component: resolve => require(['../views/slide/slide1'],resolve),
            meta:{title: 'slide1',requireAuth: true},
            },
            {
            path: 'slide2',
            component: resolve => require(['../views/slide/slide2'],resolve),
            meta:{title: 'slide2',requireAuth: true},
            },
            {
            path: 'slide3',
            component: resolve => require(['../views/slide/slide3'],resolve),
            meta:{title: 'slide3',requireAuth: true},
            },
        ]
    },
  ],
  mode:'history'   //默认
})

router.beforeEach((to, from, next) => {
    //路由钩子改标题
    if(to.meta.title){
      document.title = to.meta.title
    }
    let token = sessionStorage.getItem('token');
  
    next()
        // //判断是否需要登录权限 以及是否登录
        // if (!store.state.token && to.path !== '/wxLogin') {// 判断是否登录
        //   next({
        //       path: '/wxLogin',
        //   });
        // } else {
        //   next()
        // }
    
   
        
})

router.afterEach((to,from)=>{
})

export default router


