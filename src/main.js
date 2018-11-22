// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import API from './config/APIHeader';
import LocalStorageUtils from  './utils/LocalStorageUtils'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
window.API = API;
Vue.config.productionTip = false
const storage = new LocalStorageUtils();
window.storage = storage;

new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})