import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import NewSocialLink from 'components/admin/socialLinks/NewSocialLink';
import socialLinks from 'store/modules/socialLinks';

Vue.use(Vuex);

describe('vue components', () => {
  describe('NewSocialLink', () => {
    let store;

    beforeEach(() => {
      store = new Vuex.Store({
        modules: {
          socialLinks: _.cloneDeep(socialLinks),
        },
      });
    });

    it('contains the socialLinks from the store as anchors in a list', () => {
      const vm = new Vue({
        el: document.createElement('body'),
        render: createElement => createElement(NewSocialLink),
        store,
        router: new VueRouter(),
      });
      const el = vm.$el;
      expect(el).to.contain('form');
      const stub = sinon.stub(vm.$store, 'dispatch');
      vm.$children[0].submitRequest(new Event());
      expect(stub).to.have.been.calledWith('createSocialLink');
      stub.restore();
    });
  });
});
