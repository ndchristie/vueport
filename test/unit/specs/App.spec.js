import App from 'src/components/App';
import Vue from 'vue';

describe('App', () => {
  let vm;
  const defaultData = App.data();

  beforeEach(() => {
    vm = new Vue({
      el: document.createElement('body'),
      render: h => h(App),
    });
  });

  it('Has and displays a message', () => {
    expect(defaultData).to.have.property('message');
    expect(vm.$el.textContent).to.equal(defaultData.message);
  });
});
