
//const Login = () => import('../pages/Login.js');
const dashboard = () => import('./dashboard.js');



const routes = [
  //{ path: '/', component: Login },
  { path: '/', component: dashboard }
]

const router = new VueRouter({
  routes 
})


var app = new Vue({
    el: '#app',
    router,
    vuetify: new Vuetify(),
    
  })