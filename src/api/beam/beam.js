import request from '@/utils/request'

// 查询梁片列表
export function listBeam(query) {
  return request({
    url: '/v1/beam/beams',
    method: 'get',
    params: query
  })
}

// 查询梁片详细
export function getBeam(beamId) {
  return request({
    url: '/v1/beam/beams/' + beamId,
    method: 'get'
  })
}

// 新增梁片
export function addBeam(data) {
  return request({
    url: '/v1/beam/beams',
    method: 'post',
    data: data
  })
}

// 修改梁片
export function updateBeam(data) {
  return request({
    url: '/v1/beam/beams',
    method: 'put',
    data: data
  })
}

// 删除梁片
export function delBeam(beamId) {
  return request({
    url: '/v1/beam/beams/' + beamId,
    method: 'delete'
  })
}

// 导出梁片
export function exportBeam(query) {
  return request({
    url: '/v1/beam/beams/export',
    method: 'get',
    params: query
  })
}
