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
import UserType from '@/pages/admin/userType/index.vue';
import AddUserType from '@/pages/admin/userType/add/index.vue';
import AddLevel from '@/pages/admin/level/add/index.vue';
import EditUserType from '@/pages/admin/userType/edit/index.vue';
import EditLevel from '@/pages/admin/level/edit/index.vue';
import EditUser from '@/pages/admin/user/edit/index.vue';
import About from '@/pages/about/index.vue';
import Contact from '@/pages/contact/index.vue';
import AdminHome from '@/pages/admin/index.vue';
import User from '@/pages/admin/user/index.vue';
import ListLevel from '@/pages/admin/level/index.vue';
import ListProcess from '@/pages/admin/process/index.vue';
import EditProcess from '@/pages/admin/process/edit/index.vue';
import ListDeal from '@/pages/admin/deal/index.vue';
import EditDeal from '@/pages/admin/deal/edit/index.vue';
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
    name: "admin-company",
    path: "/admin/company",
    meta: { needsAuth: true },
    component: Company,
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
    name: "admin-company-add",
    path: "/admin/company/add",
    meta: { needsAuth: true },
    component: AddCompany,
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
    name: "admin-company-edit",
    path: "/admin/company/edit/:id",
    meta: { needsAuth: true },
    component: EditCompany,
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
    name: "admin-address",
    path: "/admin/address",
    meta: { needsAuth: true },
    component: Address,
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
    name: "admin-address-edit",
    path: "/admin/address/edit/:id",
    meta: { needsAuth: true },
    component: EditAddress,
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
    name: "admin-address-add",
    path: "/admin/address/add",
    meta: { needsAuth: true },
    component: AddAddress,
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
    name: "admin-role",
    path: "/admin/role",
    meta: { needsAuth: true },
    component: Role,
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
    name: "admin-role-edit",
    path: "/admin/role/edit/:id",
    meta: { needsAuth: true },
    component: EditRole,
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
    name: "admin-role-add",
    path: "/admin/role/add",
    meta: { needsAuth: true },
    component: AddRole,
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
    name: "admin-user-type",
    path: "/admin/user-type",
    meta: { needsAuth: true },
    component: UserType,
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
    name: "admin-user-type-add",
    path: "/admin/user-type/add",
    meta: { needsAuth: true },
    component: AddUserType,
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
    name: "admin-user-type-edit",
    path: "/admin/user-type/edit/:id",
    meta: { needsAuth: true },
    component: EditUserType,
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
    name: "admin-level",
    path: "/admin/level",
    meta: { needsAuth: true },
    component: ListLevel,
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
    name: "admin-level-add",
    path: "/admin/level/add",
    meta: { needsAuth: true },
    component: AddLevel,
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
    name: "admin-level-edit",
    path: "/admin/level/edit/:id",
    meta: { needsAuth: true },
    component: EditLevel,
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
    name: "admin-process",
    path: "/admin/process",
    meta: { needsAuth: true },
    component: ListProcess,
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
    name: "admin-process-add",
    path: "/admin/process/add",
    meta: { needsAuth: true },
    component: AddLevel,
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
    name: "admin-process-edit",
    path: "/admin/process/edit/:id",
    meta: { needsAuth: true },
    component: EditProcess,
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
    name: "admin-deal",
    path: "/admin/deal",
    meta: { needsAuth: true },
    component: ListDeal,
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
    name: "admin-deal-edit",
    path: "/admin/deal/edit/:id",
    meta: { needsAuth: true },
    component: EditDeal,
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
    name: "admin-user",
    path: "/admin/user",
    meta: { needsAuth: true },
    component: User,
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
    name: "admin-user-edit",
    path: "/admin/user/edit/:id",
    meta: { needsAuth: true },
    component: EditUser,
    beforeEnter: (to, from, next) => {
      const noToken: boolean = !localStorage.getItem("accessToken");
      if (noToken) {
        message.error("You need Login!");
        router.push("/login")
      }
      next(!noToken);
    }
  },
  // {
  //   name: "admin-address-add",
  //   path: "/admin/address/add",
  //   meta: { needsAuth: true },
  //   component: AddAddress,
  //   beforeEnter: (to, from, next) => {
  //     const noToken: boolean = !localStorage.getItem("accessToken");
  //     if (noToken) {
  //       message.error("You need Login!");
  //       router.push("/login")
  //     }
  //     next(!noToken);
  //   }
  // },
 ];

export default routes;
