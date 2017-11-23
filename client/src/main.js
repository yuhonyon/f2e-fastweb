// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import './styles/main.css';
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Fetch from './utils/fetch';
import fetchApi from './utils/api';
import { sync } from 'vuex-router-sync';
import store from './store/index.js';
Vue.use(iView);
Vue.use(ElementUI);
const unsync = sync(store, router);
window.Fetch=Fetch;
window.fetchApi=fetchApi;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
