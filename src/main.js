import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index";

import "./styles/app.css";
import "flowbite";

import Amplify from "aws-amplify";
import awsConfig from "./aws-exports";

const pinia = createPinia();
const app = createApp(App);

Amplify.configure(awsConfig);
app.use(pinia);
app.use(router);

app.mount("#app");
