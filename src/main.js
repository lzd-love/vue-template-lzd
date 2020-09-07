/*
 * @Author: lzd
 * @Date: 2020-09-03 23:59:26
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-07 09:59:17
 * @Description: content description
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "./plugins/element.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import moment from "moment";
import echarts from "echarts";
import axios from "axios";
import VueECharts from "./components/ECharts";
import config from "@config/Global.config";

Vue.config.productionTip = false;
Vue.prototype.appConfig = config;
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;
Vue.prototype.$echarts = echarts;
Vue.component("v-chart", VueECharts);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
