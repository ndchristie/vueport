import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import NewSocialLink from 'components/admin/socialLinks/NewSocialLink';

Vue.use(Vuex);

describe('vue components', () => {
  describe('NewSocialLink', () => {
    let store;

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

    it('contains the socialLinks from the store as anchors in a list', () => {
      const stub = sinon.stub(store, 'dispatch', () => Promise.resolve());
      const vm = new Vue({
        el: document.createElement('body'),
        render: createElement => createElement(NewSocialLink),
        store,
        router: new VueRouter(),
      });
      const el = vm.$el;
      expect(el).to.contain('form');
      vm.$children[0].submitRequest(new Event());
      expect(stub).to.have.been.calledWith('createSocialLink');
      sinon.stub(vm.$children[0].$refs.form, 'checkValidity', () => false);
      vm.$children[0].submitRequest(new Event());
      expect(stub).to.have.been.called.twice;
      expect(stub).to.have.been.calledWith('newSocialLink');
      stub.restore();
    });
  });
});
