import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state ={
  userinfo: '0',
}
const getters ={
  get_userinfo:state=>{
    let userinfo = state.userinfo
    return userinfo
  }
}
const mutations ={
  set_userinfo (state, data) {
    state.userinfo = data
    // localStorage.setItem('userinfo', JSON.stringify(data))
  },
}
export default new Vuex.Store({
  getters,
  state,
  mutations
})
