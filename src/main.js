import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "axios";

const app = createApp(App);

axios.defaults.headers["Accept"] = "application/json";

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      router.push({ name: "login" });
    }
    return Promise.reject(error);
  }
);

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("user_token")}`,
};

app.use(router);
app.use(Vue3Toasity, {
  autoClose: 3000,
  // ...
});

app.mount("#app");
