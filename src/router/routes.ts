import { RouteRecordRaw } from "vue-router";
import CompanyInformation from '@/pages/admin/company-information/index.vue';
import AddCompanyInformation from '@/pages/admin/company-information/add/index.vue';
import EditCompanyInformation from '@/pages/admin/company-information/edit/index.vue';
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
  
];

export default routes;
