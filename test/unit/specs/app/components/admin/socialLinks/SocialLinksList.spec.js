import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import SocialLinksList from 'components/admin/socialLinks/SocialLinksList';
import socialLinks from 'store/modules/socialLinks';

Vue.use(Vuex);

describe('vue components', () => {
  describe('SocialLinksList', () => {
    let store;

    beforeEach(() => {
      store = new Vuex.Store({
        modules: {
          socialLinks: _.cloneDeep(socialLinks),
        },
      });
    });

    it('contains a form which it submits to createSocialLink', () => {
      const expectedLinks = [
        { name: 'email', href: 'mailto:myself@email.com' },
        { name: 'github', href: 'https://github.com/myself' },
      ];
      store.commit('UPDATE_SOCIAL_LINKS_LIST', expectedLinks);
      const stub = sinon.stub(store, 'dispatch');
      const vm = new Vue({
        el: document.createElement('body'),
        render: createElement => createElement(SocialLinksList),
        store,
        router: new VueRouter(),
      });
      const el = vm.$el;
      expect(el).to.contain('ul');
      expect(el.children[1].children.length)
        .to.equal(expectedLinks.length);
      expectedLinks.forEach((link) => {
        expect(el.textContent).to.contain(link.name);
      });
    });
  });
});
