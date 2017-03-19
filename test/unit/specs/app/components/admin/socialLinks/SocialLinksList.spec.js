import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ListSocialLinks from 'components/admin/socialLinks/ListSocialLinks';
import socialLinks from 'store/modules/socialLinks';

Vue.use(Vuex);

describe('vue components', () => {
  describe('ListSocialLinks', () => {
    let store;
    const expectedLinks = [
      { name: 'email', href: 'mailto:myself@email.com' },
      { name: 'github', href: 'https://github.com/myself' },
    ];

    beforeEach(() => {
      store = new Vuex.Store({
        modules: {
          socialLinks: {
            getters: {
              socialLinksList: () => expectedLinks,
            },
          },
        },
      });
    });

    it('contains a list of social links', () => {
      const stub = sinon.stub(store, 'dispatch');
      const vm = new Vue({
        el: document.createElement('body'),
        render: createElement => createElement(ListSocialLinks),
        store,
        router: new VueRouter(),
      });
      const el = vm.$el;
      expect(el).to.contain('ul');
      const list = el.querySelector('ul');
      expect(list.children.length)
        .to.equal(expectedLinks.length);
      expectedLinks.forEach((link) => {
        expect(list.textContent).to.contain(link.name);
      });
      stub.restore();
    });
  });
});
