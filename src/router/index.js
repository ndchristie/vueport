import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from 'components/public/NotFound';
import portfolioRoutes from './portfolioRoutes';
import adminRoutes from './adminRoutes';

Vue.use(VueRouter);

const notFoundRoute = {
  path: '*',
  component: NotFound,
};

export default new VueRouter({
  mode: 'history',
  routes: [
    ...adminRoutes,
    ...portfolioRoutes,
    notFoundRoute,
  ],
});
