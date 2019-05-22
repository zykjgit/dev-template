import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/initialize.scss';
import './assets/global.scss';
import './public/component-import.js';
import mixins from './public/mixins';
Vue.config.productionTip = false;

Vue.mixin(mixins);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
