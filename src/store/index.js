import Vue from 'vue';
import Vuex from 'vuex';
import socialLinks from './modules/socialLinks';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    socialLinks,
  },
});
