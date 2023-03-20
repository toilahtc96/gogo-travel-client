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
import Career from '@/pages/admin/career/index.vue';
import AddCareer from '@/pages/admin/career/add/index.vue';
import EditCareer from '@/pages/admin/career/edit/index.vue';
import JobType from '@/pages/admin/jobType/index.vue';
import AddJobType from '@/pages/admin/jobType/add/index.vue';
import EditJobType from '@/pages/admin/jobType/edit/index.vue';
import WorkingForm from '@/pages/admin/WorkingForm/index.vue';
import AddWorkingForm from '@/pages/admin/WorkingForm/add/index.vue';
import EditWorkingForm from '@/pages/admin/WorkingForm/edit/index.vue';
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
import AddJob from '@/pages/admin/job/add/index.vue';
import EditJob from '@/pages/admin/job/edit/index.vue';
import Job from '@/pages/admin/job/index.vue';
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
  {
    name: "admin-career",
    path: "/admin/career",
    meta: { needsAuth: true },
    component: Career,
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
    name: "admin-career-edit",
    path: "/admin/career/edit/:id",
    meta: { needsAuth: true },
    component: EditCareer,
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
    name: "admin-career-add",
    path: "/admin/career/add",
    meta: { needsAuth: true },
    component: AddCareer,
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
    name: "admin-job-type",
    path: "/admin/job-type",
    meta: { needsAuth: true },
    component: JobType,
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
    name: "admin-job-type-edit",
    path: "/admin/job-type/edit/:id",
    meta: { needsAuth: true },
    component: EditJobType,
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
    name: "admin-job-type-add",
    path: "/admin/job-type/add",
    meta: { needsAuth: true },
    component: AddJobType,
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
    name: "admin-working-form",
    path: "/admin/working-form",
    meta: { needsAuth: true },
    component: WorkingForm,
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
    name: "admin-working-form-edit",
    path: "/admin/working-form/edit/:id",
    meta: { needsAuth: true },
    component: EditWorkingForm,
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
    name: "admin-working-form-add",
    path: "/admin/working-form/add",
    meta: { needsAuth: true },
    component: AddWorkingForm,
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
    name: "admin-job",
    path: "/admin/job",
    meta: { needsAuth: true },
    component: Job,
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
    name: "admin-job-edit",
    path: "/admin/job/edit/:id",
    meta: { needsAuth: true },
    component: EditJob,
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
    name: "admin-job-add",
    path: "/admin/job/add",
    meta: { needsAuth: true },
    component: AddJob,
    beforeEnter: (to, from, next) => {
      const noToken: boolean = !localStorage.getItem("accessToken");
      if (noToken) {
        message.error("You need Login!");
        router.push("/login")
      }
      next(!noToken);
    }
  },
 ];

export default routes;
