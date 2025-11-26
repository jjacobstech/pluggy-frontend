import { createRouter, createWebHistory } from 'vue-router';
import landing from '@/views/home/landing.vue';
import redirect from '@/views/RedirectPage.vue';
import login from '@/views/home/login.vue';
import register from '@/views/home/register.vue';
import dashboard from '@/views/dashboard/dashboard.vue';
import App from '@/layouts/App.vue';
import Guest from '@/layouts/Guest.vue';
import notFound from '@/views/errors/404.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Guest,
      children: [
        { path: '', component: landing },
        {path: '/:slug', component: redirect},
        { path: '/redirect', component: redirect },
        { path: '/login', component: login },
        { path: '/register', component: register },
        { path: '/404', component: notFound },
      ],
    },
    {
      path: '/dashboard',
      component: App,
      meta: { requiresAuth: true },
      children: [{ path: '', component: dashboard }],
    },
  ],
});

export default router;
