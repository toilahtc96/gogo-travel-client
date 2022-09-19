import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import LoginAdmin from "@/pages/login-admin/index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/dynamic/index.vue"),
      children: routes,
    },
    {
      path: "/admin-login",
      component: LoginAdmin
    }
  ],
});

export default router;
