import type { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  component: () => import('../layouts/AuthLayout.vue'),
  redirect: { name: 'login' },
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: 'register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
  ],
};
