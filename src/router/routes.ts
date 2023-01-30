import { RouteRecordRaw } from "vue-router";
import Company from '@/pages/admin/company/index.vue';
import AddCompany from '@/pages/admin/company/add/index.vue';
import EditCompany from '@/pages/admin/company/edit/index.vue';

import Address from '@/pages/admin/address/index.vue';
import AddAddress from '@/pages/admin/address/add/index.vue';
import EditAddress from '@/pages/admin/address/edit/index.vue';
import Role from '@/pages/admin/role/index.vue';
import AddRole from '@/pages/admin/role/add/index.vue';
import EditRole from '@/pages/admin/role/edit/index.vue';
import About from '@/pages/about/index.vue';
import Contact from '@/pages/contact/index.vue';
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
        router.push("/admin-login")
      }
      next(!noToken);
    }
  },
  {
    name: "admin-company",
    path: "/admin/company",
    meta: { needsAuth: true },
    component: Company,
    beforeEnter: (to, from, next) => {
      const noToken: boolean = !localStorage.getItem("accessToken");
      if (noToken) {
        message.error("You need Login!");
        router.push("/admin-login")
      }
      next(!noToken);
    },
  },
  {
    name: "admin-company-add",
    path: "/admin/company/add",
    meta: { needsAuth: true },
    component: AddCompany,
    beforeEnter: (to, from, next) => {
      const noToken: boolean = !localStorage.getItem("accessToken");
      if (noToken) {
        message.error("You need Login!");
        router.push("/admin-login")
      }
      next(!noToken);
    }
  },
  {
    name: "admin-company-edit",
    path: "/admin/company/edit/:id",
    meta: { needsAuth: true },
    component: EditCompany,
    beforeEnter: (to, from, next) => {
      const noToken: boolean = !localStorage.getItem("accessToken");
      if (noToken) {
        message.error("You need Login!");
        router.push("/admin-login")
      }
      next(!noToken);
    }
  },
  {
    name: "admin-address",
    path: "/admin/address",
    meta: { needsAuth: true },
    component: Address,
    beforeEnter: (to, from, next) => {
      const noToken: boolean = !localStorage.getItem("accessToken");
      if (noToken) {
        message.error("You need Login!");
        router.push("/admin-login")
      }
      next(!noToken);
    }
  },
  {
    name: "admin-address-edit",
    path: "/admin/address/edit/:id",
    meta: { needsAuth: true },
    component: EditAddress,
    beforeEnter: (to, from, next) => {
      const noToken: boolean = !localStorage.getItem("accessToken");
      if (noToken) {
        message.error("You need Login!");
        router.push("/admin-login")
      }
      next(!noToken);
    }
  },
  {
    name: "admin-address-add",
    path: "/admin/address/add",
    meta: { needsAuth: true },
    component: AddAddress,
    beforeEnter: (to, from, next) => {
      const noToken: boolean = !localStorage.getItem("accessToken");
      if (noToken) {
        message.error("You need Login!");
        router.push("/admin-login")
      }
      next(!noToken);
    }
  },
  {
    name: "admin-role",
    path: "/admin/role",
    meta: { needsAuth: true },
    component: Role,
    beforeEnter: (to, from, next) => {
      const noToken: boolean = !localStorage.getItem("accessToken");
      if (noToken) {
        message.error("You need Login!");
        router.push("/admin-login")
      }
      next(!noToken);
    }
  },
  {
    name: "admin-role-edit",
    path: "/admin/role/edit/:id",
    meta: { needsAuth: true },
    component: EditRole,
    beforeEnter: (to, from, next) => {
      const noToken: boolean = !localStorage.getItem("accessToken");
      if (noToken) {
        message.error("You need Login!");
        router.push("/admin-login")
      }
      next(!noToken);
    }
  },
 ];

export default routes;
