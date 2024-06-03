import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/LandingPage.vue')
  },
  {
    path: '/zakazanitermini',
    name: 'ZakazaniTermini',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pacijent-ZakazaniTermini.vue')
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () => import(/* webpackChunkName: "about" */ '../views/LogIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) =>{
  let user = JSON.parse(localStorage.getItem('user'));
  if(user != null){
    // provjera da li je token važeć
  axios.post('http://localhost:3000/verify', user)
  .then(response => {
  console.log('Token je važeć, možeš ići dalje:', response.data);
  })
  .catch(error => {
  alert("Token više nije važeć ili je istekao, ulogiraj se ponovno");
  localStorage.removeItem('user');
  next('/');
  console.error('Error:', error); 
  });

}

 next();


});

export default router
