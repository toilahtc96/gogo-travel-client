import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import LoginAdmin from "@/pages/login-admin/index.vue";
import DynamicLayout from '@/layouts/dynamic/index.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/admin",
      component: DynamicLayout,
      children: routes
    },
    {
      path: "/admin-login",
      component: LoginAdmin,
      beforeEnter: () => {
        localStorage.removeItem("accessToken");
      }
    }
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
      if(savedPosition) {
          return savedPosition;
      }
      return {left: 0, top: 0 };
  }
});

export default router;
