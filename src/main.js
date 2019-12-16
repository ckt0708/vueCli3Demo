import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import Vant from 'vant';
// import 'vant/lib/index.css';

// 引入公共样式
require("./assets/css/common.css");

// 引入amfe-flexible 10px = 10/37.5 rem
import 'amfe-flexible/index.js'

// 全局引入
// Vue.use(Vant);

Vue.config.productionTip = false;

Vue.prototype.$axios = axios.create({
  baseURL: 'https://xcvtu.cn/',//测试地址
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
