import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import NewSocialLink from 'components/admin/socialLinks/NewSocialLink';

Vue.use(Vuex);
const sandbox = sinon.sandbox.create();
let store;
const router = new VueRouter();
const testSocialLink = { name: 'test', href: 'http://test.com' };

describe('vue components', () => {
  describe('NewSocialLink', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        modules: {
          socialLinks: {
            getters: {
              activeSocialLink: () => ({ name: 'test', href: 'http://test.com' }),
            },
            actions: {
              createSocialLink: () => testSocialLink,
            },
          },
        },
      });
    });

    afterEach(() => {
      sandbox.restore();
      router.push('/');
    });

    it('contains the socialLinks from the store as anchors in a list', () => {
      const vm = new Vue({
        el: document.createElement('body'),
        render: createElement => createElement(NewSocialLink),
        store,
        router: new VueRouter(),
      });
      const comp = vm.$children[0];
      const form = comp.$refs.form;
      const checkValidity = sandbox.stub(form, 'checkValidity');
      checkValidity.returns(false);
      return comp.submitRequest(new Event())
        .then(() => {
          checkValidity.returns(true);
          return comp.submitRequest(new Event());
        })
        .then((data) => {
          expect(data).to.deep.equal(testSocialLink);
        });
    });
  });
});
