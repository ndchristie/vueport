import ApplicationHeader from 'components/layout/ApplicationHeader';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const mockedStore = new Vuex.Store({
  state: {
    priorityRoutes: {
      about: '#',
      approach: '#',
    },
  },
});

describe('ApplicationHeader', () => {
  it('contains the priorityRoutes from the store as anchors in a list', () => {
    const vm = new Vue({
      el: document.createElement('body'),
      render: createElement => createElement(ApplicationHeader),
      store: mockedStore,
    });
    const applicationHeader = vm.$children[0];
    const el = applicationHeader.$el;
    expect(el).to.contain('ul');
    expect(el.children[0].children.length)
      .to.equal(Object.keys(vm.$store.state.priorityRoutes).length);
    Object.keys(mockedStore.state.priorityRoutes).forEach((name) => {
      expect(el.textContent).to.contain(name);
    });
  });
});
