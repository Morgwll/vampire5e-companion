import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.http.options.root = 'https://vampire-companion-9e6fa.firebaseio.com/data.json';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
