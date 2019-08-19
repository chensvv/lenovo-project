import fetch from './http'

export function login (data) {
  return fetch.service_head({
    url: '/lasf-mgr/user/login',
    method: 'post',
    data: data
  })
}

export function userList (data) {
  return fetch.service_head({
    url: '/lasf-mgr/user/list',
    method: 'post',
    data: data
  })
}

export function userAdd (data) {
  return fetch.service_head({
    url: '/lasf-mgr/user/add',
    method: 'post',
    data: data
  })
}

export function userUpd (data) {
  return fetch.service_head({
    url: '/lasf-mgr/user/update',
    method: 'post',
    data: data
  })
}

export function userDel (data) {
  return fetch.service_head({
    url: '/lasf-mgr/user/del',
    method: 'post',
    data: data
  })
}

export function userRole (data) {
  return fetch.service_head({
    url: '/lasf-mgr/role/rolelistpage',
    method: 'post',
    data: data
  })
}

export function userRoleEcho (data) {
  return fetch.service_head({
    url: '/lasf-mgr/user/queryRole',
    method: 'post',
    data: data
  })
}

export function userRoleSave (data) {
  return fetch.service_head({
    url: '/lasf-mgr/user/editRole',
    method: 'post',
    data: data
  })
}

export function roleList (data) {
  return fetch.service_head({
    url: '/lasf-mgr/role/rolelistpage',
    method: 'post',
    data: data
  })
}

export function roleAdd (data) {
  return fetch.service_head({
    url: '/lasf-mgr/role/add',
    method: 'post',
    data: data
  })
}

export function roleDel (data) {
  return fetch.service_head({
    url: '/lasf-mgr/role/del',
    method: 'post',
    data: data
  })
}

export function roleEcho (data) {
  return fetch.service_head({
    url: '/lasf-mgr/role/queryOne',
    method: 'post',
    data: data
  })
}

export function roleUpd (data) {
  return fetch.service_head({
    url: '/lasf-mgr/role/update',
    method: 'post',
    data: data
  })
}

export function authList (data) {
  return fetch.service_head({
    url: '/lasf-mgr/Rule/list',
    method: 'post',
    data: data
  })
}