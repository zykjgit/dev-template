import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes.js';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
Vue.use(VueRouter);
const router = new VueRouter({
  mode: process.env.NODE_ENV === 'production' ? 'history' : '',
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
  NProgress.done();
});
export default router;
