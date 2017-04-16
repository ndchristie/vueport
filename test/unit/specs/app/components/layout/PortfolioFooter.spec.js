import Vue from 'vue';
import Vuex from 'vuex';
import PortfolioFooter from '@/components/layout/PortfolioFooter';
import socialLinks from '@/store/modules/socialLinks';
import fetchMock from 'fetch-mock';

Vue.use(Vuex);

describe('vue components', () => {
  describe('PortfolioFooter', () => {
    let store;

    beforeEach(() => {
      store = new Vuex.Store({
        modules: {
          socialLinks: _.cloneDeep(socialLinks),
        },
      });
    });

    afterEach(() => {
      fetchMock.restore();
    });

    it('contains the socialLinks from the store as anchors in a list', () => {
      const expectedLinks = [
        { name: 'email', href: 'mailto:myself@email.com' },
        { name: 'github', href: 'https://github.com/myself' },
      ];
      fetchMock.get('/api/social-links', expectedLinks);
      store.state.socialLinks.list = expectedLinks;
      const vm = new Vue({
        el: document.createElement('body'),
        render: createElement => createElement(PortfolioFooter),
        store,
      });
      const el = vm.$el;
      expect(el).to.contain('ul');
      expect(el.children[0].children.length)
        .to.equal(expectedLinks.length);
      expectedLinks.forEach((link) => {
        expect(el.textContent).to.contain(link.name);
      });
    });
  });
});
