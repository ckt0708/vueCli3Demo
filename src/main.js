import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vant from 'vant';
import 'vant/lib/index.css';

// 引入公共样式
require("./assets/css/common.css");

Vue.use(Vant);

Vue.config.productionTip = false;

Vue.prototype.$axios = axios.create({
  baseURL: 'baidu.com',//测试地址
  transformResponse:[function(data) {
    return data;
  }],
  timeout: 20000,
  responseType: 'json', // default
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
