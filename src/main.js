/* eslint-disable no-undef */
/* eslint-disable import/first */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'default-passive-events'
Vue.config.productionTip = false

// 使用element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 使用axios
import http from './config/http'
Vue.prototype.$http = http

// import '../mock/mock.js'
import '../static/css/base.css'

import store from './store/index'

const has = Vue.directive('has', {
  inserted: function (el, binding) {
    // 获取按钮权限
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})
Vue.prototype.$_has = function (value) {
  let isExit = false
  let buttonpermsStr = JSON.parse(sessionStorage.getItem('btnpermission'))

  if (buttonpermsStr === undefined || buttonpermsStr === null) {
    return false
  }
  for (let i = 0; i < buttonpermsStr.length; i++) {
    // console.log(buttonpermsStr[i].id)
    if (value === buttonpermsStr[i].id) {
      isExit = true
      break
    }
  }
  return isExit
}
export {has}

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: {
    App,
    store
  },
  template: '<App/>'
})
