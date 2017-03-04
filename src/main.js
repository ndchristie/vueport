import Vue from 'vue';
import router from './router';
import store from './store';
import App from './components/App';

const app = new Vue({
  el: 'app',
  render: createElement => createElement(App),
  router,
  store,
});

export default app;
