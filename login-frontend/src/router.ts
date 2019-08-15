import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      // lazy loading, code splitting
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/confirm',
      component: () => import('./views/Confirmation.vue')
    },
    {
      path: '/regrefused',
      component: () => import('./views/RegRefused.vue')
    },
    {
      path: '/success',
      component: () => import('./views/SuccessLogin.vue')
    }
  ]
});
