import Vue from 'vue';
import App from './components/App';

const app = new Vue({
  el: 'body',
  render: h => h(App),
});

export default app;
