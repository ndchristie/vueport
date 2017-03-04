import ApplicationLayout from 'components/layout/ApplicationLayout';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

describe('ApplicationLayout', () => {
  Vue.use(Vuex);
  const mockedStore = new Vuex.Store({
    socialLinks: {
      email: 'mailto:me@email.com',
      github: 'https://github.com/ndchristie',
    },
  });

  Vue.use(VueRouter);
  const mockedRouter = new VueRouter({
    abstract: true,
    routes: [{
      path: '/',
      component: ApplicationLayout,
    }],
  });

  it('has a header and a footer as child components', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h('router-view'),
      store: mockedStore,
      router: mockedRouter,
    });
    mockedRouter.go('/');
    const app = vm.$children[0];
    expect(app.$options.components).to.have.property('ApplicationHeader');
    expect(app.$el).to.contain('.application-header');
    expect(app.$options.components).to.have.property('ApplicationFooter');
    expect(app.$el).to.contain('.application-footer');
  });

  afterEach(() => {
    mockedRouter.go('/');
  });
});
