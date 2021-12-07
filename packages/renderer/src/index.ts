import {createApp} from 'vue';
import App from '/@/App.vue';
import router from '/@/router';
import './index.css'

// router.afterEach((to, from) => {
//   const toDepth = to.path.split('/').length
//   const fromDepth = from.path.split('/').length
//   // to.meta.transitionName =  'slide-fade'
//   // to.meta.transitionMode ="out-in"
// })

createApp(App)
  .use(router)
  .mount('#app');
