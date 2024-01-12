import request from '@/utils/request'

// 查询龙门吊列表
export function listCrane(query) {
  return request({
    url: '/v1/beam/cranes',
    method: 'get',
    params: query
  })
}

// 查询龙门吊详细
export function getCrane(craneId) {
  return request({
    url: '/v1/beam/cranes/' + craneId,
    method: 'get'
  })
}

// 新增龙门吊
export function addCrane(data) {
  return request({
    url: '/v1/beam/cranes',
    method: 'post',
    data: data
  })
}

// 修改龙门吊
export function updateCrane(data) {
  return request({
    url: '/v1/beam/cranes',
    method: 'put',
    data: data
  })
}

// 删除龙门吊
export function delCrane(craneId) {
  return request({
    url: '/v1/beam/cranes/' + craneId,
    method: 'delete'
  })
}

// 导出龙门吊
export function exportCrane(query) {
  return request({
    url: '/v1/beam/cranes/export',
    method: 'get',
    params: query
  })
}
