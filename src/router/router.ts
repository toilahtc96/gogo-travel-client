import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import LoginAdmin from "@/pages/login-admin/index.vue";
import Login from "@/pages/user-pages/login/index.vue";
import Signup from "@/pages/user-pages/signup/index.vue";
import Register from "@/pages/register/index.vue"
import DynamicLayout from '@/layouts/dynamic/index.vue';
import Home from "@/pages/user-pages/home/index.vue";
import About from "@/pages/user-pages/about/index.vue";
import Contact from "@/pages/user-pages/contact/index.vue";
import Profile from "@/pages/user-pages/user-profile/index.vue";
import CompanyAdd from "@/pages/user-pages/company-add/index.vue";
import JobAdd from "@/pages/user-pages/job-add/index.vue";
import JobDetail1 from "@/pages/user-pages/job-detail-1/index.vue";
import JobDetail2 from "@/pages/user-pages/job-detail-2/index.vue";
import Step from "@/pages/user-pages/step/index.vue";
import Voucher from "@/pages/user-pages/voucher/index.vue";
import VoucherAddClient from "@/pages/user-pages/voucher/add/index.vue";
import VoucherEditClient from "@/pages/user-pages/voucher/edit/index.vue";
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
      name: "contact",
      path: "/contact",
      component: Contact,
    },
    {
      name: "job-add",
      path: "/job-add",
      component: JobAdd,
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
    {
      name: "job-detail-1",
      path: "/job-detail-1/:id",
      component: JobDetail1,
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
    {
      name: "job-detail",
      path: "/job-detail-2/:id",
      component: JobDetail2,
      meta: { needsAuth: true },
      beforeEnter: (to, from, next) => {
        const noToken: boolean = !localStorage.getItem("accessToken");
        if (noToken) {
          message.error("You need Login!");
          router.push("/login")
        }
        next(!noToken);
      },
    },
    {
      name: "company-add",
      path: "/company-add",
      component: CompanyAdd,
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
    {
      name: "companies",
      path: "/companies",
      component: JobAdd,
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
    {
      name: "voucher",
      path: "/voucher",
      component: Voucher,
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
    {
      name: "add-voucher",
      path: "/voucher/add",
      component: VoucherAddClient,
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
    {
      name: "voucher-edit",
      path: "/voucher/edit/:id",
      component: VoucherEditClient,
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
    {
      name: "job-step",
      path: "/job/step/:id",
      component: Step,
      meta: { needsAuth: true },
      beforeEnter: (to, from, next) => {
        const noToken: boolean = !localStorage.getItem("accessToken");
        if (noToken) {
          message.error("You need Login!");
          router.push("/login")
        }
        next(!noToken);
      },
    }

  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  }
});

export default router;
