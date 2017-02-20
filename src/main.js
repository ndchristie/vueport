import Vue from 'vue';
import App from './components/App';

const app = new Vue({
  el: 'body',
  render: createElement => createElement(App),
});

export default app;
