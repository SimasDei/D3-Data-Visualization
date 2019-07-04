import Vue from 'vue';
import * as d3 from 'd3';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, '$d3', { value: d3 });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
