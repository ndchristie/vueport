import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ViewSocialLink from 'components/admin/socialLinks/ViewSocialLink';
import socialLinks from 'store/modules/socialLinks';

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
          socialLinks: _.cloneDeep(socialLinks),
        },
      });
    });

    it('contains a form which it submits to updateSocialLink', () => {
      const stub = sinon.stub(store, 'dispatch');
      stub.returnsPromise();
      stub.resolves(true);
      const vm = new Vue({
        el: document.createElement('div'),
        render: h => h('router-view'),
        store,
        router,
      });
      router.push('test');
      expect(stub).to.have.been.calledWith('fetchSocialLink');
    });
  });
});
