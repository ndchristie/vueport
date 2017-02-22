import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socialLinks: {
      email: 'mailto:nathan@ndchristie.com',
      github: 'https://github.com/ndchristie',
    },
    priorityRoutes: {
      about: '#',
      approach: '#',
    },
  },
});
