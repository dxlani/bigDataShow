import Vue from 'vue'
import Router from 'vue-router'

// import home1 from '../views/home1/home1.vue'
// import slide1 from '../views/slide1/slide.vue'
// import slide2 from '../views/slide2/slide.vue'
// import slide3 from '../views/slide3/slide.vue'
// import slide4 from '../views/slide4/slide.vue'
// import slide5 from '../views/slide5/slide.vue'

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


