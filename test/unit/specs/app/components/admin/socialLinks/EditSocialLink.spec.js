import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import EditSocialLink from 'components/admin/socialLinks/EditSocialLink';
import socialLinks from 'store/modules/socialLinks';

Vue.use(Vuex);

describe('vue components', () => {
  describe('EditSocialLink', () => {
    let store;
    let router;

    beforeEach(() => {
      store = new Vuex.Store({
        modules: {
          socialLinks: _.cloneDeep(socialLinks),
        },
      });
      router = new VueRouter({
        abstract: true,
        routes: [{
          path: '/:name', component: EditSocialLink,
        }],
      });
    });

    it('contains a form which it submits to updateSocialLink', (done) => {
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
      Vue.nextTick(() => {
        expect(stub).to.have.been.calledWith('fetchSocialLink');
        vm.$children[0].submitRequest(new Event());
        sinon.stub(vm.$children[0].$refs.form, 'checkValidity', () => false);
        vm.$children[0].submitRequest(new Event());
        expect(stub).to.have.been.calledWith('updateSocialLink');
        stub.restore();
        done();
      });
    });
  });
});
