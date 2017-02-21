import Vue from 'vue';
import App from './components/App';

const app = new Vue({
  el: 'app',
  render: createElement => createElement(App),
});

export default app;
