import axios from 'axios'
import router from '../router'
import {
  // Loading,
  Message,MessageBox} from 'element-ui'
  // let proURL = 'http://m.voice.lenovomm.com'
// eslint-disable-next-line no-unused-vars
let service = {}
// let proURL = 'http://10.110.148.59:8085'
let proURL = 'https://voice.lenovomm.com'
// axios 配置
// eslint-disable-next-line camelcase
const service_head = axios.create({
  // baseURL: '/api',
  baseURL: proURL,
  // timeout: 15000, // 请求超时时间
  withCredentials: false,
})
// let loading
// function startLoading () { // 使用Element loading-start 方法
//   // eslint-disable-next-line no-undef
//   loading = Loading.service({
//     lock: true,
//     background: 'rgba(255,255,255,0.7)'
//   })
// }
// function endLoading () { // 使用Element loading-close 方法
//   loading.close()
// }
// http request 拦截器
service_head.interceptors.request.use(
  config => {
    // if (localStorage.token) { // 判断token是否存在
    //   config.headers.Authorization = localStorage.token // 将token设置成请求头
    // }
    return config
  }, err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
service_head.interceptors.response.use(response => {
  // endLoading()
  switch (response.data) {
    case 123:
      Message.closeAll()
      Message({
        message: '没有权限',
        type: 'warning',
        duration: 1000
      })
      router.replace('/401')
      break
    case 888:
      Message.closeAll()
      MessageBox.alert('登录超时，请重新登录', '', {
        confirmButtonText: '确定',
        showClose:false,
        center: true,
        callback: action => {
          sessionStorage.clear()
          router.replace('/login')
        }
      });
      break
    default:
      return response
  }
  return response
}, error => {
  // console.log(error.response)
  // endLoading()
  switch (error.response.status){
    case 403:
      // console.log(error.response.url.indexOf('logout'))
      if(error.response.config.url.indexOf('logout') == -1){
        Message.closeAll()
        // Message({
        //   message: '登录超时，请重新登录',
        //   type: 'error',
        //   duration: 1500
        // })
        MessageBox.alert('登录超时，请重新登录', '', {
          confirmButtonText: '确定',
          showClose:false,
          center: true,
          callback: action => {
            sessionStorage.clear()
            router.replace('/login')
          }
        });
      }
      
      break
    case 500:
      Message.closeAll()
      Message.error({
        message: '请稍后重试！'
      })
      // sessionStorage.clear()
      break
      case 404:
        Message.closeAll()
        Message.error({
          message: '请稍后重试！'
        })
        // sessionStorage.clear()
      break
    default:
      return error
  }
  
  return Promise.reject(error)
})

const UPFile = axios.create({
  baseURL: proURL,
  // timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

const FileDownload = axios.create({
  baseURL: proURL,
  // timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json; application/octet-stream'
  },
  responseType: 'blob'
})
const ExcelDownload = axios.create({
  baseURL: proURL,
  // timeout: 15000, // 请求超时时间
  responseType: 'blob',
  
})
export default service = {
  service_head,
  UPFile,
  FileDownload,
  proURL,
  ExcelDownload
}
