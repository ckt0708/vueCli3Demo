import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import Vant from 'vant';
// import 'vant/lib/index.css';
// 全局引入
// Vue.use(Vant);

// Vue.prototype.$axios = axios.create({
//   baseURL: 'http://7788xhp.com',//测试地址
//   transformResponse:[function(data) {
//     return data;
//   }],
//   timeout: 20000,
//   responseType: 'json', // default
// });

// 引入axios封装方法
import Http from './utils/http'
Vue.use(Http)

// 引入公共样式
require("./assets/css/common.css");

// 引入amfe-flexible 10px = 10/37.5 rem
import 'amfe-flexible/index.js'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
