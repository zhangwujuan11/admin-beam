import request from '@/utils/request'

// 查询监控密钥列表
export function listAccount(query) {
  return request({
    url: '/v1/beam/accounts',
    method: 'get',
    params: query
  })
}

// 查询监控密钥详细
export function getAccount(cameraUserId) {
  return request({
    url: '/v1/beam/accounts/' + cameraUserId,
    method: 'get'
  })
}

// 新增监控密钥
export function addAccount(data) {
  return request({
    url: '/v1/beam/accounts',
    method: 'post',
    data: data
  })
}

// 修改监控密钥
export function updateAccount(data) {
  return request({
    url: '/v1/beam/accounts',
    method: 'put',
    data: data
  })
}

// 删除监控密钥
export function delAccount(cameraUserId) {
  return request({
    url: '/v1/beam/accounts/' + cameraUserId,
    method: 'delete'
  })
}

// 导出监控密钥
export function exportAccount(query) {
  return request({
    url: '/v1/beam/accounts/export',
    method: 'get',
    params: query
  })
}
