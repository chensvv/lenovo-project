import fetch from './http'

export function login (data) {
  return fetch.service_head({
    url: '/lasf-mgr/user/login',
    method: 'post',
    data: data
  })
}

export function userMenu (data) {
  return fetch.service_head({
    url: '/lasf-mgr/user/getMenu',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function userList (data) {
  return fetch.service_head({
    url: '/lasf-mgr/user/list',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function userAdd (data) {
  return fetch.service_head({
    url: '/lasf-mgr/user/add',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function userUpd (data) {
  return fetch.service_head({
    url: '/lasf-mgr/user/update',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function userDel (data) {
  return fetch.service_head({
    url: '/lasf-mgr/user/del',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function userRole (data) {
  return fetch.service_head({
    url: '/lasf-mgr/role/rolelistpage',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function userRoleEcho (data) {
  return fetch.service_head({
    url: '/lasf-mgr/user/queryRole',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function userRoleSave (data) {
  return fetch.service_head({
    url: '/lasf-mgr/user/editRole',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function roleList (data) {
  return fetch.service_head({
    url: '/lasf-mgr/role/list',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function roleAdd (data) {
  return fetch.service_head({
    url: '/lasf-mgr/role/add',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function roleDel (data) {
  return fetch.service_head({
    url: '/lasf-mgr/role/del',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function roleEcho (data) {
  return fetch.service_head({
    url: '/lasf-mgr/role/queryOne',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function roleUpd (data) {
  return fetch.service_head({
    url: '/lasf-mgr/role/update',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function authList (data) {
  return fetch.service_head({
    url: '/lasf-mgr/Rule/queryone',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function akskList (data) {
  return fetch.service_head({
    url: '/lasf-mgr/userinfo/list',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function akskDetail (data) {
  return fetch.service_head({
    url: '/lasf-mgr/userinfo/detail',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function modinfy (data) {
  return fetch.service_head({
    url: '/lasf-mgr/userinfo/modify',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function activitiList (data) {
  return fetch.service_head({
    url: '/lasf-mgr/activiti/list',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function activitiPass (data) {
  return fetch.service_head({
    url: '/lasf-mgr/activiti/pass',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function activitinList (data) {
  return fetch.service_head({
    url: '/lasf-mgr/activiti/nlist',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function activitiStatus (data) {
  return fetch.service_head({
    url: '/lasf-mgr/activiti/status',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function userinfoUpdate (data) {
  return fetch.service_head({
    url: '/lasf-mgr/userinfo/update',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function authAdd (data) {
  return fetch.service_head({
    url: '/lasf-mgr/Rule/add',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function authDel (data) {
  return fetch.service_head({
    url: '/lasf-mgr/Rule/delete',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}

export function authUpdate (data) {
  return fetch.service_head({
    url: '/lasf-mgr/Rule/update',
    method: 'post',
    data: data,
    headers: {
      't': JSON.parse(sessionStorage.getItem('token')).t
    }
  })
}
