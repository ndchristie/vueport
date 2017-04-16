import App from '@/components/App';
import Vue from 'vue';
import VueRouter from 'vue-router';

describe('vue components', () => {
  describe('App', () => {
    Vue.use(VueRouter);
    const router = new VueRouter({
      abstract: true,
      routes: [
        { path: '/' },
      ],
    });

    it('has no child components of its own', () => {
      const vm = new Vue({
        el: document.createElement('div'),
        render: h => h(App),
        router,
      });
      router.go('/');
      const app = vm.$children[0];
      expect(app.$children).to.deep.equal([]);
    });
  });
});
