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
    path: '/login',
    name: 'LogIn',
    component: () => import(/* webpackChunkName: "about" */ '../views/LogIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
  },
  {
    path: '/zakazanitermini',
    name: 'ZakazaniTermini',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pacijent-ZakazaniTermini.vue')
  },
  {
    path: '/zakazitermin',
    name: 'ZakaziTermin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pacijent-ZakaziTermin.vue')
  },
  {
    path: '/termin/:id',
    name: 'Termin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pacijent-PrikazTermina.vue')
  },


];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) =>{

  const javnaDostupnost = ['/login', '/', '/signup'];
  const potrebanToken = !javnaDostupnost.includes(to.path);
  const nepotrebanToken = javnaDostupnost.includes(to.path);
  const doktorToken = [];
  const pacijentToken = [];
  let user = JSON.parse(localStorage.getItem('user'));



  if(user != null){
    // provjera da li je token važeć
  axios.post('http://localhost:3000/verify', user)
  .then(response => {
  console.log('Token je važeć, možeš ići dalje:', response.data);

  next();
  })
  .catch(error => {
  alert("Token autentifikacije više nije važeć ili je istekao, ulogiraj se ponovno");
  localStorage.removeItem('user');
  next('/');
  console.error('Error:', error); 
  });

} 
else{
  if(potrebanToken){
    next("/");
  }
  else{
    next();
  }
}

});

export default router
