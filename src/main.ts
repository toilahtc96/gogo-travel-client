import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/router";
import "ant-design-vue/dist/antd.min.css";
import { createPinia } from "pinia";
import Antd from 'ant-design-vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Antd);
app.mount("#app");
