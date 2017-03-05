import App from 'components/App';
import Vue from 'vue';
import VueRouter from 'vue-router';

describe('App', () => {
  Vue.use(VueRouter);
  const mockedRouter = new VueRouter({
    abstract: true,
    routes: [
      { path: '/' },
    ],
  });

  it('has no child components of its own', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(App),
      router: mockedRouter,
    });
    mockedRouter.go('/');
    const app = vm.$children[0];
    expect(app.$children).to.deep.equal([]);
  });

  afterEach(() => {
    mockedRouter.go('/');
  });
});
