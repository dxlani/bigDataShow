import Vue from 'vue'
import Router from 'vue-router'



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
    //   path:'/ht',
    //   component: htContent,
    //   children:[
    //         {
    //         path: '',
    //         component: resolve => require(['../views/hengtong/htAcceptList'],resolve),
    //         meta:{title: '历史收发',requireAuth: true,index:0},
    //         },
    //     ]
    // },
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


