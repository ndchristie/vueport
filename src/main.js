import Vue from 'vue';
import store from './store';
import App from './components/App';

const app = new Vue({
  el: 'app',
  render: createElement => createElement(App),
  store,
});

export default app;
