import request from '@/utils/request'

// 查询桥梁-梁片架设关系;列表
export function listBridgeBeam(query) {
  return request({
    url: '/v1/beam/bridgeBeams',
    method: 'get',
    params: query
  })
}

// 查询桥梁-梁片架设关系;详细
export function getBridgeBeam(id) {
  return request({
    url: '/v1/beam/bridgeBeams/' + id,
    method: 'get'
  })
}

// 新增桥梁-梁片架设关系;
export function addBridgeBeam(data) {
  return request({
    url: '/v1/beam/bridgeBeams',
    method: 'post',
    data: data
  })
}

// 修改桥梁-梁片架设关系;
export function updateBridgeBeam(data) {
  return request({
    url: '/v1/beam/bridgeBeams',
    method: 'put',
    data: data
  })
}

// 删除桥梁-梁片架设关系;
export function delBridgeBeam(id) {
  return request({
    url: '/v1/beam/bridgeBeams/' + id,
    method: 'delete'
  })
}

// 导出桥梁-梁片架设关系;
export function exportBridgeBeam(query) {
  return request({
    url: '/v1/beam/bridgeBeams/export',
    method: 'get',
    params: query
  })
}
