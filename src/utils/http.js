/* 

封装axios
使用方法：

http.get('/api/url',{uid:1}).then((res)=>{

})

*/

import Vue from 'vue'
import { Toast } from 'vant'
import axios from "axios"

const service = axios.create({
    baseURL: 'http://7788xhp.com',//测试地址
    transformResponse:[function(data) {
        return data;
    }],
    timeout: 20000,
    responseType: 'json', // default
})

// request拦截器 request interceptor
service.interceptors.request.use(
    config => {
        console.log("request")
        // 不传递默认开启loading
        // if (!config.hideloading) {
        //     // loading
        //     Toast.loading({
        //         forbidClick: true
        //     })
        // }
        // if (store.getters.token) {
        //     config.headers['X-Token'] = ''
        // }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// service.interceptors.request.use(function (response) {
//         // Do something before request is sent
//         console.log("request")
//         return response;
//     }, function (error) {
//         // Do something with request error
//         return Promise.reject(error);
//     }
// );

// respone拦截器
service.interceptors.response.use(
    response => {
        console.log("response")
        Toast.clear()
        const res = response.data
        if (res.status && res.status !== 200) {
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
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

// export default service

export default{
    service,
    /**
     * get方法，对应get请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     */
    get (url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * post方法，对应post请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     */
    post (url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    /**
     * postFormData方法，对应post请求，用来提交文件+数据
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     */
    postFormData (url, params) {
        return new Promise((resolve, reject) => {
            axios({
                headers: {
                    'Content-Type': 'multipart/form-data'// ;boundary=----WebKitFormBoundaryQ6d2Qh69dv9wad2u
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
    },

}