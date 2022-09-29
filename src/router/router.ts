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
      beforeEnter: () => {
        if(!localStorage.getItem("accessToken")){
          router.push("/admin-login");
        }
      }
    },
    {
      path: "/admin-login",
      component: LoginAdmin,
      beforeEnter: () => {
        localStorage.removeItem("accessToken");
      }
    }
  ],
});

export default router;
