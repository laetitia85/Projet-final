import Vue from "vue";
import App from "./App.vue";
import router from "./router/routes";
import store from "./store/store";
import axios from "axios";
import VueAxios from "vue-axios";
import Vuelidate from "vuelidate";
import { BootstrapVue } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbvue/lib/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Navbar from "./layouts/Navbar.vue";
import Footer from "./layouts/Footer.vue";

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(Vuelidate);

Vue.component(Navbar);
Vue.component(Footer);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
