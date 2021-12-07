import {createRouter, createWebHashHistory} from 'vue-router';
import Auth from '/@/views/Auth.vue';
import Home from '/@/views/Home.vue'
const routes = [
  {path: '/', name: 'Auth', component: Auth, meta: { transition: 'slide-left', mode:"out-in" }},
  {path: '/home', name: 'Home', component:Home, meta: { transition: 'slide-left', mode:"out-in" },}
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
