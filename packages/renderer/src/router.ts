import {createRouter, createWebHashHistory} from 'vue-router';
import Auth from '/@/views/Auth.vue';
import Home from '/@/views/Home.vue'
const routes = [
  {path: '/', name: 'Auth', component: Auth},
  {path: '/home', name: 'Home', component:Home}, // Lazy load route component
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
