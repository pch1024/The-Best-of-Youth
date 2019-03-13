import Vue from 'vue';
import App from './App.vue';
import router from './router/index';

document.body.style.height = `${document.documentElement.clientHeight}px`;
document.body.style.width = '100%';

const vm = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
console.log(vm);
