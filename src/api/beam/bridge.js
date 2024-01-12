import request from '@/utils/request'

// 查询桥梁列表
export function listBridge(query) {
  return request({
    url: '/v1/beam/bridges',
    method: 'get',
    params: query
  })
}

// 查询桥梁详细
export function getBridge(bridgeId) {
  return request({
    url: '/v1/beam/bridges/' + bridgeId,
    method: 'get'
  })
}

// 新增桥梁
export function addBridge(data) {
  return request({
    url: '/v1/beam/bridges',
    method: 'post',
    data: data
  })
}

// 修改桥梁
export function updateBridge(data) {
  return request({
    url: '/v1/beam/bridges',
    method: 'put',
    data: data
  })
}

// 删除桥梁
export function delBridge(bridgeId) {
  return request({
    url: '/v1/beam/bridges/' + bridgeId,
    method: 'delete'
  })
}

// 导出桥梁
export function exportBridge(query) {
  return request({
    url: '/v1/beam/bridges/export',
    method: 'get',
    params: query
  })
}
