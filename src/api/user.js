import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/site/login',
    method: 'post',
    data
  })
}

export function registration(data) {
  return request({
    url: '/site/registration',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/managers',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/site/logout',
    method: 'post'
  })
}
