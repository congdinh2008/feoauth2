import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";
import axios from "axios";
import store from "./store";
import authService from "./auth/authService";
import addAuthInterceptors from "./auth/authInterceptors";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(Vuelidate);

addAuthInterceptors(axios);

authService.loadUser().then((user) => {
  store.dispatch("tryAutoLogin", authService);
  console.log(user);
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
