import Vue from 'vue';
import Router from 'vue-router';

// import PageHome from '@/pages/PageHome.vue';
import Start from '@/pages/Start.vue';
import Lesson1 from '@/pages/Lesson1.vue';
import Lesson2 from '@/pages/Lesson2.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start,
    },
    {
      path: '/:package',
      name: 'Package',
      component: Start,
    },
    {
      path: '/lesson1',
      name: 'Lesson1',
      component: Lesson1,
    },
    {
      path: '/lesson2',
      name: 'Lesson2',
      component: Lesson2,
    },
  ],
});
