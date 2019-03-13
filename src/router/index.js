import Vue from 'vue';
import VueRouter from 'vue-router';

import DragDrop from '../pages/dragdrop';
import Home from '../pages/home';
import MouseSwiper from '../pages/mouseSwiper';
import Flex from '../pages/flex';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dargdorp',
    name: 'DargDorp',
    component: DragDrop
  },
  {
    path: '/mouseSwiper',
    name: 'MouseSwiper',
    component: MouseSwiper
  },
  {
    path: '/flex',
    name: 'Flex',
    component: Flex
  }
];

export default new VueRouter({
  routes // （缩写）相当于 routes: routes
});
