import router from './router'


router.beforeEach((to, from, next) => {
  if(to.path == '/superManager'){

  }
  // if(to.path === '/login'){
  //   sessionStorage.removeItem('user');
  // }
  // var user = sessionStorage.getItem('user');
  // if(!user && to.path !== '/login'){
  //   next({
  //     path: '/login'
  //   })
  // }else{
  //   next();
  // }
  next();
})