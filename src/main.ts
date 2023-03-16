import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/router";
import "ant-design-vue/dist/antd.min.css";
import { createPinia } from "pinia";
import Antd from 'ant-design-vue';
import 'bootstrap/scss/bootstrap.scss';
import 'swiper/css/bundle';
import './assets/css/fontAwesome5Pro.css';
import 'bootstrap';
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import './assets/scss/main.scss';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Antd);
app.use(BootstrapVue3);
app.mount("#app");
