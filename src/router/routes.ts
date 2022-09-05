import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    component: () => import("@/pages/home/index.vue"),
  },
  {
    path: "about",
    component: () => import("@/pages/about/index.vue"),
  },
  {
    path: "contact",
    component: () => import("@/pages/contact/index.vue"),
  },
];

export default routes;
