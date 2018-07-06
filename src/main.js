// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import axios from '@/libs/fetch';

axios.defaults.withCredentials = true;

Vue.prototype.$http = axios

Vue.config.productionTip = false

import Cookies from 'js-cookie';
router.beforeEach((to, from, next) => {
  window.currentUrl = to.path
  // NProgress.start(); // 开启Progress
  if (Cookies.get("account")) {

    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next();
    }
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next({ path: '/login' });
    }
  }
  // NProgress.done();
});
/* eslint-disable no-new */
var v = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
window.vue = v;
