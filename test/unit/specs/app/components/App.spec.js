import App from 'components/App';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const mockedStore = new Vuex.Store({
  socialLinks: {
    email: 'mailto:me@email.com',
    github: 'https://github.com/ndchristie',
  },
});

describe('App', () => {
  it('Has a header and a footer as child components', () => {
    const vm = new Vue({
      el: document.createElement('body'),
      render: createElement => createElement(App),
      store: mockedStore,
    });
    const app = vm.$children[0];
    expect(app.$options.components).to.have.property('ApplicationHeader');
    expect(app.$el).to.contain('.application-header');
    expect(app.$options.components).to.have.property('ApplicationFooter');
    expect(app.$el).to.contain('.application-footer');
  });
});
