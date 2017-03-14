import PortfolioHeader from 'components/layout/PortfolioHeader';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    priorityRoutes: {
      about: '#',
      approach: '#',
    },
  },
});

describe('vue components', () => {
  describe('PortfolioHeader', () => {
    it('contains the priorityRoutes from the store as anchors in a list', () => {
      const vm = new Vue({
        el: document.createElement('body'),
        render: createElement => createElement(PortfolioHeader),
        store,
      });
      const applicationHeader = vm.$children[0];
      const el = applicationHeader.$el;
      expect(el).to.contain('ul');
      expect(el.children[0].children.length)
        .to.equal(Object.keys(vm.$store.state.priorityRoutes).length);
      Object.keys(store.state.priorityRoutes).forEach((name) => {
        expect(el.textContent).to.contain(name);
      });
    });
  });
});
