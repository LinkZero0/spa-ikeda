import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import vuetify from "./plugins/vuetify";
import Toast from "vue-toastification";
import VueSweetalert2 from "vue-sweetalert2";
import vueVimeoPlayer from 'vue-vimeo-player'

import "sweetalert2/dist/sweetalert2.min.css";
import "@/assets/styles/sweetalert2.scss";
import "vue-toastification/dist/index.css";
import './registerServiceWorker'

Vue.use(Toast);
Vue.use(VueSweetalert2);
Vue.use(vueVimeoPlayer);


Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
  store,
}).$mount("#app");
