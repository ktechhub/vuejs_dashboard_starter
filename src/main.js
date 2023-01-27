import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import vue3GoogleLogin from 'vue3-google-login'

import 'mosha-vue-toastify/dist/style.css'

const appInstance = createApp(App);

appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.use(vue3GoogleLogin, {
    clientId: '935099804801-s4vb7qkblrjes6ud6bhpqdob8ncvkd8n.apps.googleusercontent.com'
  })
appInstance.mount("#app");
