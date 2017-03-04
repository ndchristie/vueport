import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from 'components/public/NotFound';
import applicationRoutes from './applicationRoutes';

Vue.use(VueRouter);

const notFoundRoute = {
  path: '*',
  component: NotFound,
};

export default new VueRouter({
  mode: 'history',
  routes: [
    ...applicationRoutes,
    notFoundRoute,
  ],
});
