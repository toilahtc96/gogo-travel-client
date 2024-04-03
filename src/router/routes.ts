import { RouteRecordRaw } from "vue-router";
import CompanyInformation from '@/pages/admin/company-information/index.vue';
import AddCompanyInformation from '@/pages/admin/company-information/add/index.vue';
import EditCompanyInformation from '@/pages/admin/company-information/edit/index.vue';
import EditMainInformation from '@/pages/admin/main-information/edit/index.vue';
import MainInformation from '@/pages/admin/main-information/index.vue';
import ReasonChoose from '@/pages/admin/reason-choose/index.vue';
import AddReasonChoose from '@/pages/admin/reason-choose/add/index.vue';
import EditReasonChoose from '@/pages/admin/reason-choose/edit/index.vue';
import Tour from '@/pages/admin/tour/index.vue';
import AddTour from '@/pages/admin/tour/add/index.vue';
import EditTour from '@/pages/admin/tour/edit/index.vue';
import Registration from'@/pages/admin/registration/index.vue';
import AdminHome from '@/pages/admin/index.vue';
import { message } from "ant-design-vue";
import router from "./router";
const routes: Array<RouteRecordRaw> = [
  {
    name: "admin-home",
    path: "/admin",
    meta: { needsAuth: true },
    component: AdminHome,
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
    name: "admin-company-information",
    path: "/admin/company-information",
    meta: { needsAuth: true },
    component: CompanyInformation,
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
    name: "admin-company-information-add",
    path: "/admin/company-information/add",
    meta: { needsAuth: true },
    component: AddCompanyInformation,
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
    name: "admin-company-information-edit",
    path: "/admin/company-information/edit/:id",
    meta: { needsAuth: true },
    component: EditCompanyInformation,
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
    name: "admin-registration",
    path: "/admin/registration",
    meta: { needsAuth: true },
    component: Registration,
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
    name: "admin-reason-choose",
    path: "/admin/reason-choose",
    meta: { needsAuth: true },
    component: ReasonChoose,
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
    name: "admin-reason-choosen-add",
    path: "/admin/reason-choose/add",
    meta: { needsAuth: true },
    component: AddReasonChoose,
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
    name: "admin-reason-choose-edit",
    path: "/admin/reason-choose/edit/:id",
    meta: { needsAuth: true },
    component: EditReasonChoose,
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
    name: "admin-main-information-edit",
    path: "/admin/main-information/edit/:id",
    meta: { needsAuth: true },
    component: EditMainInformation,
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
    name: "admin-main-information",
    path: "/admin/main-information",
    meta: { needsAuth: true },
    component: MainInformation,
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
    name: "admin-tour",
    path: "/admin/tour",
    meta: { needsAuth: true },
    component: Tour,
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
    name: "admin-tour-add",
    path: "/admin/tour/add",
    meta: { needsAuth: true },
    component: AddTour,
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
    name: "admin-tour-edit",
    path: "/admin/tour/edit/:id",
    meta: { needsAuth: true },
    component: EditTour,
    beforeEnter: (to, from, next) => {
      const noToken: boolean = !localStorage.getItem("accessToken");
      if (noToken) {
        message.error("You need Login!");
        router.push("/login")
      }
      next(!noToken);
    }
  }
];

export default routes;
