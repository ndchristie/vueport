import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import PortfolioLayout from '@/components/layout/PortfolioLayout';
import socialLinks from '@/store/modules/socialLinks';
import _ from 'lodash';

Vue.use(Vuex);
Vue.use(VueRouter);

describe('vue components', () => {
  describe('PortfolioLayout', () => {
    let router;
    let store;
    let stubbedFetchSocialLinks;

    beforeEach(() => {
      stubbedFetchSocialLinks = sinon.stub(socialLinks.actions, 'fetchSocialLinksList');
      store = new Vuex.Store({
        modules: {
          socialLinks,
        },
      });
      router = new VueRouter({
        abstract: true,
        routes: [{
          path: '/',
          component: PortfolioLayout,
        }],
      });
    });

    afterEach(() => {
      stubbedFetchSocialLinks.restore();
    });

    it('has a header and a footer as child components', () => {
      const vm = new Vue({
        el: document.createElement('div'),
        render: h => h(PortfolioLayout),
        store: _.cloneDeep(store),
        router: _.cloneDeep(router),
      });
      router.go('/');
      const app = vm.$children[0];
      expect(app.$options.components).to.have.property('PortfolioHeader');
      expect(app.$el).to.contain('.portfolio-header');
      expect(app.$options.components).to.have.property('PortfolioFooter');
      expect(app.$el).to.contain('.portfolio-footer');
    });
  });
});
