import ApplicationFooter from 'components/layout/ApplicationFooter';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const mockedStore = new Vuex.Store({
  state: {
    socialLinks: {
      email: 'mailto:me@email.com',
      github: 'https://github.com/ndchristie',
    },
  },
});

describe('ApplicationFooter', () => {
  it('contains the socialLinks from the store as anchors in a list', () => {
    const vm = new Vue({
      el: document.createElement('body'),
      render: createElement => createElement(ApplicationFooter),
      store: mockedStore,
    });
    const applicationFooter = vm.$children[0];
    const el = applicationFooter.$el;
    expect(el).to.contain('ul');
    expect(el.children[0].children.length)
      .to.equal(Object.keys(vm.$store.state.socialLinks).length);
    Object.keys(mockedStore.state.socialLinks).forEach((name) => {
      expect(el.textContent).to.contain(name);
    });
  });
});
