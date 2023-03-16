import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import LoginAdmin from "@/pages/login-admin/index.vue";
import Login from "@/pages/user-pages/login/index.vue";
import Signup from "@/pages/user-pages/signup/index.vue";
import Register from "@/pages/register/index.vue"
import DynamicLayout from '@/layouts/dynamic/index.vue';
import Home from "@/pages/user-pages/home/index.vue";
import About from "@/pages/user-pages/about/index.vue";
import Profile from "@/pages/user-pages/user-profile/index.vue";
import { message } from "ant-design-vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/admin",
      component: DynamicLayout,
      children: routes
    },
     {
      path: "/",
      component: Home
    },
    {
      path: "/admin-login",
      component: LoginAdmin,
      beforeEnter: () => {
        localStorage.removeItem("accessToken");
      }
    },
    {
      path: "/admin-register",
      component: Register,
      beforeEnter: () => {
        localStorage.removeItem("accessToken");
      }
    },
    {
      path: "/login",
      component: Login,
      beforeEnter: () => {
        localStorage.removeItem("accessToken");
      }
    },
    {
      path: "/register",
      component: Signup, 
    },
    {
      name: "about",
      path: "/about",
      component: About,
    },
    {
      name: "profile",
      path: "/profile",
      component: Profile,
      meta: { needsAuth: true },
      beforeEnter: (to, from, next) => {
        const noToken: boolean = !localStorage.getItem("accessToken");
        if (noToken) {
          message.error("You need Login!");
          router.push("/login")
        }
        next(!noToken);
      }
    },
   
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
