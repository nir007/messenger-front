import request from '@/utils/request'

export function readAll(params) {
  return request({
    url: '/admin/users/' + params.appID,
    method: 'get'
  })
}

export function readOne(params) {
  return request({
    url: '/admin/user/' + params.id + '/' + params.appID,
    method: 'get'
  })
}

export function create(params) {
  return request({
    url: '/admin/users',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/admin/users/' + params.id,
    method: 'put',
    data: params
  })
}

export function remove(params) {
  return request({
    url: '/admin/users/' + params.id + '/' + params.appID,
    method: 'delete'
  })
}
