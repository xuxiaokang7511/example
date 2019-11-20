import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})
const CancelToken = axios.CancelToken

// service.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 添加取消请求
    config.cancelToken = new CancelToken(cancel => {
      store.dispatch('axios/addCancle', cancel)
    })
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * 通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  response => {
    const res = response.data
    // console.log('response ' + response.config.noBox)
    // debugger

    if (res.code !== 20000) {
      // 50002:非法的token; 50003:其他客户端登录了; 50004:Token 过期了;
      if (res.code === 50002 || res.code === 50003 || res.code === 50004) {
        // 登录失效了，取消后续的请求
        store.dispatch('axios/clearCancles')
        if (!response.config.noBox) {
          // to re-login
          MessageBox.confirm(
            '你已被登出，可以取消继续留在该页面，或者重新登录',
            '确定登出',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            store.dispatch('user/resetToken').then(() => {
              // 为了重新实例化vue-router对象 避免bug
              location.reload()
            })
          })
        } else {
          Message({
            message: '你已被登出，重新登录',
            type: 'warning',
            duration: 3 * 1000
          })
        }
      } else if (res.code === 50001) {
        MessageBox.confirm(
          '权限不足，可以取消继续留在该页面，或者切换账号',
          '确定切换账号',
          {
            confirmButtonText: '切换账号',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            // 为了重新实例化vue-router对象 避免bug
            location.reload()
          })
        })
      } else {
        Message({
          message: res.msg || res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (axios.isCancel(error)) {
      console.log('isCancel')
      // 为了终结promise链 就是实际请求 不会走到.catch(rej=>{});这样就不会触发错误提示之类了。
      return new Promise(() => {})
    } else {
      console.log('err' + error) // for debug
      Message({
        message: error.message || error.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
