import firebase from 'firebase/app';
import 'firebase/auth';

import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Menu from './views/Menu.vue';
import Test from './views/Test.vue';

Vue.use(Router);

const appTitle = 'Menu';

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: `${appTitle}`,
      },
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu,
      meta: {
        title: `${appTitle} | Menu`,
        requiresAuth: true,
      },
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: {
        title: `${appTitle} | Test`,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router;
