/* 
封装axios
*/

import axios from "axios"
import { Toast } from 'vant'
// qs 是对 post 请求 data 进行处理，不然后台接收不了数据
// 因为axios post请求默认Content-type是 application/json
import qs from 'qs'


axios.defaults.timeout = 5000 // 5s没响应则认为该请求失败
axios.defaults.baseURL = 'http://7788xhp.com'
// axios.defaults.withCredentials = true	// 跨域时如果要带上cookie话则需要设置withCrendentials

// http request 拦截器 所有请求发出前都需要执行以下代码
axios.interceptors.request.use(
    request => {
        // console.log("request",request)
        request.data = qs.stringify(request.data) //这里就用qs对data就行处理
        request.headers = {
          'Content-Type': 'application/x-www-form-urlencoded' //设置header覆盖content-type
        }
        Toast.loading({
            type:"loading",
            forbidClick: true,
            loadingType:"spinner",
        })
        return request
    },
    error => {
        return Promise.reject(error)
    }
)

// respone拦截器
axios.interceptors.response.use(
    response => {
        Toast.clear()
        const res = response
        if (res.code && res.code !== 0) {
            // 登录超时,重新登录
            if (res.status === 401) {
            //   store.dispatch('FedLogOut').then(() => {
            //     location.reload()
            //   })
            }
            return Promise.reject(res || 'error')
        } else {
            return Promise.resolve(res)
        }
    },
    error => {
        Toast.clear()
        console.log('err' + error)
        return Promise.reject(error)
    }
)

/**
 *  封装get方法 跟 post 方法
 *  @param url
 *  @param params
 *  @returns {Promise}
 */
 
// 这种写法是导出后可以通过在main.js中使用Vue.use(http) 挂载到vue实例上
export default {
    install: (Vue) => {
        Vue.prototype.$get = (url, params = {}) => {
            return new Promise((resolve, reject) => {
                axios.get(url, {params})
                .then(response => resolve(response.data))
                .catch(error => reject(error))
            })
        }
        Vue.prototype.$post = (url, params = {}) => {
            return new Promise((resolve, reject) => {
                axios.post(url, params)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
            })
        }
        /**
         * postFormData方法，对应post请求，用来提交文件+数据
         * @param {String} url [请求的url地址]
         * @param {Object} params [请求时携带的参数]
         */
        Vue.prototype.postFormData = (url, params = {}) =>{
            return new Promise((resolve, reject) => {
                axios({
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
                        const formData = new FormData()
                        Object.keys(data).forEach(key => {
                            formData.append(key, data[key])
                        })
                        return formData
                    }],
                    url,
                    method: 'post',
                    data: params
                }).then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}