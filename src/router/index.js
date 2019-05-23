import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes.js';
Vue.use(VueRouter);
const router = new VueRouter({
  mode: process.env.NODE_ENV === 'production' ? 'history' : '',
  routes
});

export default router;
