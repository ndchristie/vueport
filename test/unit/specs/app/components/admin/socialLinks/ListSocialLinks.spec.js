import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ListSocialLinks from '@/components/admin/socialLinks/ListSocialLinks';

Vue.use(Vuex);
const sandbox = sinon.sandbox.create();
let store;
const expectedLinks = [
  { name: 'email', href: 'mailto:myself@email.com' },
  { name: 'github', href: 'https://github.com/myself' },
];

describe('vue components', () => {
  describe('ListSocialLinks', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        modules: {
          socialLinks: {
            getters: {
              socialLinksList: () => expectedLinks,
            },
            actions: {
              fetchSocialLinksList: () => expectedLinks,
              deleteSocialLink: () => true,
            },
          },
        },
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('contains a list of social links', () => {
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
      const lis = list.querySelectorAll('li');
      expectedLinks.forEach((link, i) => {
        expect(lis[i].textContent).to.contain(link.name);
        expect(lis[i].querySelector('a').href).to.contain(link.href);
        expect(lis[i].querySelector('a').textContent).to.contain(link.href);
      });
    });

    it('deletes an object via the api', () => {
      sandbox.spy(ListSocialLinks.methods, 'deleteSocialLink');
      const vm = new Vue({
        el: document.createElement('div'),
        render: createElement => createElement(ListSocialLinks),
        store,
        router: new VueRouter(),
      });
      const comp = vm.$children[0];
      sandbox.stub(console, 'error');
      return comp.fetchSocialLinksList()
        .then(() => comp.requestDeletion(expectedLinks[0]))
        .then(() => {
          sandbox.stub(store, 'dispatch')
            .returns(Promise.reject());
          return expect(comp.requestDeletion(expectedLinks[0])).to.throw;
        });
    });
  });
});
