// /** 权限指令**/
// import Vue from 'vue'

// Vue.directive('has', {
//   bind: function (el, binding) {
//     if (!Vue.prototype.$_has(binding.value)) {
//       // el.parentNode.removeChild(el);
//       el.style.display = 'none'
//     }
//   }
// })
// let menuTreeList = sessionStorage.getItem('menuData')
// let btnPermissions = []
// for (let item of menuTreeList) {
//   if (item.menutype === 0) {
//     btnPermissions.push({
//       code: item.ruleCode
//     })
//   }
//   for (let towMenus of item.children) {
//     if (towMenus.menutype === 0) {
//       btnPermissions.push({
//         code: item.ruleCode
//       })
//     }
//     for (let threeMenus of towMenus.children2) {
//       if (threeMenus.menutype === 0) {
//         btnPermissions.push({
//           code: item.ruleCode
//         })
//       }
//     }
//   }
// }
// // 权限检查方法
// Vue.prototype.$_has = function (value) {
//   let isExist = false
//   //  获取拥有的权限
//   console.log(btnPermissions) // aa
//   // 权限列表
//   console.log(value) // aa bb
//   // eslint-disable-next-line eqeqeq
//   if (btnPermissions == value) {
//     isExist = true
//   }
//   return isExist
// }
