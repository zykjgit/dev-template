import Vue from 'vue';
import Vuex from 'vuex';
import viewTabs from './viewTabs.js';
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  modules: {
    viewTabs
  },
  strict: debug
});
