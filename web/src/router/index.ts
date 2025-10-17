import { createRouter, createWebHistory } from "vue-router";
import landing from "../views/landing.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: "/", component: landing }],
});

export default router;
