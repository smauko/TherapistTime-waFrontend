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
  {
    path: '/ocijenidoktora',
    name: 'OcijeniDoktora',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pacijent-OcijeniDoktora.vue')
  },
  {
    path: '/zakazaniterminD',
    name: 'ZakazaniTerminiDoktorView',
    component: () => import(/* webpackChunkName: "about" */ '../views/Doktor-ZakazaniTermini.vue')
  },
  {
    path: '/terminD/:id',
    name: 'TerminDoktora',
    component: () => import(/* webpackChunkName: "about" */ '../views/Doktor-PrikazTermina.vue')
  },
  {
    path: '/prikazprofila',
    name: 'PrikazProfila',
    component: () => import(/* webpackChunkName: "about" */ '../views/PrikazProfila.vue')
  },
  {
    path: '/urediprofil',
    name: 'UrediProfil',
    component: () => import(/* webpackChunkName: "about" */ '../views/UrediProfil.vue')
  },




];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) =>{

  const javnaDostupnost = ['/login', '/', '/signup'];
  const doktorDostupnost = ['/zakazaniterminD','/terminD/:id'];
  const pacijentDostupnost = ['/zakazanitermini','/zakazitermin','/termin/:id','/ocijenidoktora'];
  const potrebanToken = !javnaDostupnost.includes(to.path);
  const potrebanDoktorToken = !doktorDostupnost.includes(to.path) ;
  const potrebanPacijentToken = !pacijentDostupnost.includes(to.path) ;
  let user = JSON.parse(localStorage.getItem('user'));



  if(user != null){
    // provjera da li je token važeć
  axios.post('http://localhost:3000/verify', user)
  .then(response => {
  console.log('Token je važeć, možeš ići dalje:', response.data, user.uloga);
  if(user.uloga == "Doktor" && !potrebanPacijentToken || !potrebanToken){
    next("zakazaniterminD");
    //console.log("Proslo if prvi",user.uloga == "Doktor" && !potrebanPacijentToken && potrebanToken);
  }
  else if(user.uloga=="Pacijent" && !potrebanDoktorToken || !potrebanToken){
    next("zakazanitermini");
    //console.log("doslo u else if prvi",user.uloga=="Pacijent" && !potrebanDoktorToken && !potrebanToken);
  }
  else{  next();}
  })
  .catch(error => {
  alert("Token autentifikacije više nije važeć ili je istekao, ulogiraj se ponovno");
  localStorage.removeItem('user');
  next('/');
  console.error('Error:', error); 
  });

} 
else{
  if(potrebanToken && !user){
    next("/");
  
  }
  else{
    next();
  }
}

});

export default router
