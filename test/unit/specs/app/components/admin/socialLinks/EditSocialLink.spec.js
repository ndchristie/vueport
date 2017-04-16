import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import EditSocialLink from '@/components/admin/socialLinks/EditSocialLink';

Vue.use(Vuex);
const sandbox = sinon.sandbox.create();
let store;
let router;
const testSocialLink = { name: 'test', href: 'http://test.com' };

describe('vue components', () => {
  describe('EditSocialLink', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        modules: {
          socialLinks: {
            getters: {
              activeSocialLink: () => testSocialLink,
            },
            actions: {
              fetchSocialLink: () => testSocialLink,
              updateSocialLink: () => testSocialLink,
            },
          },
        },
      });
      router = new VueRouter({
        abstract: true,
        routes: [
          { path: '/admin/social-links/' },
          { path: '/:name', component: EditSocialLink },
        ],
      });
    });

    afterEach(() => {
      sandbox.restore();
      router.push('/');
    });

    it('finds a matching object on create', (done) => {
      sandbox.spy(EditSocialLink.methods, 'fetchSocialLink');
      const vm = new Vue({
        el: document.createElement('div'),
        render: h => h('router-view'),
        store,
        router,
      });
      router.push('test');
      Vue.nextTick(() => {
        const comp = vm.$children[0];
        const form = vm.$el.querySelector('form');
        return comp.fetchData().then(() => {
          Object.keys(testSocialLink).forEach((key) => {
            expect(form).to.contain(`input#${key}`);
            expect(form.querySelector(`input#${key}`)).to.have.value(testSocialLink[key]);
          });
          expect(EditSocialLink.methods.fetchSocialLink).to.have.been.called;
          done();
        });
      });
    });

    it('returns to index if no match found', (done) => {
      sandbox.stub(EditSocialLink.methods, 'fetchSocialLink')
        .returns(Promise.reject());
      const vm = new Vue({
        el: document.createElement('div'),
        render: h => h('router-view'),
        store,
        router,
      });
      router.push('willReject');
      Vue.nextTick(() => {
        const comp = vm.$children[0];
        sandbox.stub(console, 'error');
        return comp.fetchData().then(() => {
          console.error.restore();
          expect(vm.$route.path).to.equal('/admin/social-links/');
          done();
        });
      });
    });

    it('contains a form which it submits to updateSocialLink', (done) => {
      sandbox.spy(EditSocialLink.methods, 'updateSocialLink');
      const vm = new Vue({
        el: document.createElement('div'),
        render: h => h('router-view'),
        store,
        router,
      });
      router.push('test');
      Vue.nextTick(() => {
        const comp = vm.$children[0];
        const form = comp.$refs.form;
        const checkValidity = sandbox.stub(form, 'checkValidity');
        return comp.fetchData().then(() => {
          checkValidity.returns(false);
          return comp.submitRequest(new Event());
        })
          .then(() => {
            checkValidity.returns(true);
            return comp.submitRequest(new Event());
          }).then((data) => {
            expect(data).to.deep.equal(testSocialLink);
            done();
          });
      });
    });
  });
});
