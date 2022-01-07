import axios from "axios"
import { Message } from "element-ui"
import store from "@/store"
import { getToken } from "@/utils/auth"
// import { config } from '../../public/config'

let baseURL = null
const apiUrl = window.webApiPath
    // 目前生产和开发是一样的请求地址，如有需要再行切换。

// production
if (process.env.NODE_ENV === "production") {
    baseURL = apiUrl
}
// develop
if (process.env.NODE_ENV === "development") {
    baseURL = apiUrl
}

store.server = apiUrl

// create an axios instance
const service = axios.create({
    baseURL,
    timeout: 50000 * 3
})

// request interceptor
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers.Authorization = "Bearer " + getToken() // 将token设置成请求头
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
            // if the custom code is not 20000, it is judged as an error.
            // if (res.code !== 20000) {
            //   Message({
            //     message: res.data.msg || 'Error',
            //     type: 'error',
            //     duration: 5 * 1000
            //   })

        //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //     // to re-login
        //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //       confirmButtonText: 'Re-Login',
        //       cancelButtonText: 'Cancel',
        //       type: 'warning'
        //     }).then(() => {
        //       store.dispatch('user/resetToken').then(() => {
        //         location.reload()
        //       })
        //     })
        //   }
        //   return Promise.reject(new Error(res.data.msg || 'Error'))
        // } else {
        //   return res
        // }
        return res
    },
    error => {
        console.log(error.message) // for debug
        if (error.message.indexOf("403") > 0) {
            Message({
                message: "您无权操作",
                type: "warning",
                duration: 5 * 1000
            })
        } else if (error.message.indexOf("401") > 0) {
            store.dispatch("user/logout").then(() => {
                // 需要重定向的话 就需要检查有没有token了
                location.href = location.href.split("?")[0]
                    // +'#/login?redirect='+location.href.split('#')[1]
            })
            Message({
                message: "登录超时，请重新登录",
                type: "error",
                duration: 5 * 1000
            })
        } else {
            // Message({
            //   message:"请检查网络设置"+ error.message,
            //   type: 'error',
            //   duration: 5 * 1000
            // })
            return Promise.reject(error || "登录超时，请重新登录")
        }
    }
)

export default service