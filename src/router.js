import Vue from 'vue';
import Router from 'vue-router';

import PageHome from '@/pages/PageHome.vue';
import Lesson1 from '@/pages/Lesson1.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'PageHome',
      component: PageHome,
    },
    {
      path: '/lesson1',
      name: 'Lesson1',
      component: Lesson1,
    },
  ],
});
