import Vue from "vue";
import VeeValidate from "vee-validate";
import VueMask from 'v-mask'

import App from "./App";
//Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(VueMask);

new Vue({
  el: "#app2",
  render: h => h(App)
});
