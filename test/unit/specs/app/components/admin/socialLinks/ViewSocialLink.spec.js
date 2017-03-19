import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ViewSocialLink from 'components/admin/socialLinks/ViewSocialLink';

Vue.use(Vuex);

describe('vue components', () => {
  describe('ViewSocialLink', () => {
    let store;
    const router = new VueRouter({
      abstract: true,
      routes: [{
        path: '/:name', component: ViewSocialLink,
      }],
    });

    beforeEach(() => {
      store = new Vuex.Store({
        modules: {
          socialLinks: {
            getters: {
              activeSocialLink: () => ({ name: 'test', href: 'http://test.com' }),
            },
          },
        },
      });
    });

    afterEach(() => {
      router.push('/');
    });

    it('contains the details for the current social link', (done) => {
      const stub = sinon.stub(store, 'dispatch', () => Promise.resolve());
      const vm = new Vue({
        el: document.createElement('div'),
        render: h => h('router-view'),
        store,
        router,
      });
      router.push('test');
      Vue.nextTick(() => {
        expect(stub).to.have.been.calledWith('fetchSocialLink');
        stub.restore();
        done();
      });
    });
  });
});
