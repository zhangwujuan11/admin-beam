import request from '@/utils/request'

// 查询桥墩配置;列表
export function listPier(query) {
  return request({
    url: '/v1/beam/piers',
    method: 'get',
    params: query
  })
}

// 查询桥墩配置;详细
export function getPier(pierId) {
  return request({
    url: '/v1/beam/piers/' + pierId,
    method: 'get'
  })
}

// 新增桥墩配置;
export function addPier(data) {
  return request({
    url: '/v1/beam/piers',
    method: 'post',
    data: data
  })
}

// 修改桥墩配置;
export function updatePier(data) {
  return request({
    url: '/v1/beam/piers',
    method: 'put',
    data: data
  })
}

// 删除桥墩配置;
export function delPier(pierId) {
  return request({
    url: '/v1/beam/piers/' + pierId,
    method: 'delete'
  })
}

// 导出桥墩配置;
export function exportPier(query) {
  return request({
    url: '/v1/beam/piers/export',
    method: 'get',
    params: query
  })
}
