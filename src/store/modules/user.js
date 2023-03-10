export default {
  state: {
    perms: '0' // 用户权限标识集合
  },
  getters: {

  },
  mutations: {
    setPerms (state, newVal) { // 用户权限标识集合
      state.perms = newVal
    }
  },
  actions: {

  }
}
