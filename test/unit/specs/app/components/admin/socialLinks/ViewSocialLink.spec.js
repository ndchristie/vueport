import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ViewSocialLink from 'components/admin/socialLinks/ViewSocialLink';

Vue.use(Vuex);
const sandbox = sinon.sandbox.create();
let store;
let router;
const testSocialLink = { name: 'test', href: 'http://test.com' };

describe('vue components', () => {
  describe('ViewSocialLink', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        modules: {
          socialLinks: {
            getters: {
              activeSocialLink: () => testSocialLink,
            },
            actions: {
              fetchSocialLink: () => testSocialLink,
              deleteSocialLink: () => true,
            },
          },
        },
      });
      router = new VueRouter({
        abstract: true,
        routes: [
          { path: '/admin/social-links/' },
          { path: '/:name', component: ViewSocialLink },
        ],
      });
    });

    afterEach(() => {
      sandbox.restore();
      router.push('/');
    });

    it('finds a matching object on create', (done) => {
      const fetchData = sandbox.spy(ViewSocialLink.methods, 'fetchData');
      const fetchSocialLink = sandbox.spy(ViewSocialLink.methods, 'fetchSocialLink');
      const vm = new Vue({
        el: document.createElement('div'),
        render: h => h('router-view'),
        store,
        router,
      });
      router.push('test');
      Vue.nextTick(() => {
        const comp = vm.$el;
        expect(comp.textContent).to.contain('Name');
        expect(comp.textContent).to.contain(testSocialLink.name);
        expect(comp.textContent).to.contain('HREF');
        expect(comp.textContent).to.contain(testSocialLink.href);
        expect(fetchData).to.have.been.called;
        expect(fetchSocialLink).to.have.been.called;
        done();
      });
    });

    it('returns to index if no match found', (done) => {
      sandbox.stub(ViewSocialLink.methods, 'fetchSocialLink')
        .returns(Promise.reject());
      sandbox.stub(console, 'error');
      const vm = new Vue({
        el: document.createElement('div'),
        render: h => h('router-view'),
        store,
        router,
      });
      router.push('willReject');
      Vue.nextTick(() => {
        const comp = vm.$children[0];
        return comp.fetchData().then(() => {
          expect(vm.$route.path).to.equal('/admin/social-links/');
          done();
        });
      });
    });

    it('deletes the object via the api', (done) => {
      sandbox.spy(ViewSocialLink.methods, 'deleteSocialLink');
      const vm = new Vue({
        el: document.createElement('div'),
        render: h => h('router-view'),
        store,
        router,
      });
      router.push('test');
      Vue.nextTick(() => {
        const comp = vm.$children[0];
        sandbox.stub(console, 'error');
        return comp.fetchData()
          .then(() => comp.requestDeletion(new Event()))
          .then(() => {
            sandbox.stub(store, 'dispatch')
              .returns(Promise.reject());
            return expect(comp.requestDeletion(new Event())).to.throw;
          })
          .then(() => {
            done();
          });
      });
    });
  });
});
