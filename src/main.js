import Vue from "vue";
import App from "./App.vue";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import * as timeago from "timeago.js";
import Swal from "sweetalert2";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
