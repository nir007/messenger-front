import request from '@/utils/request'

export function readAll(params) {
  return request({
    url: '/admin/applications',
    method: 'get'
  })
}

export function readOne(params) {
  return request({
    url: '/admin/applications/' + params.id,
    method: 'get'
  })
}

export function create(params) {
  return request({
    url: '/admin/applications',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/admin/applications/' + params.id,
    method: 'put',
    data: params
  })
}

export function remove(params) {
  alert( params.id)
  return request({
    url: '/admin/applications/' + params.id,
    method: 'delete'
  })
}
