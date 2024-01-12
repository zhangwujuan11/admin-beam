import request from '@/utils/request'

// 查询监控列列表
export function listCamera(query) {
  return request({
    url: '/v1/beam/cameras',
    method: 'get',
    params: query
  })
}

// 查询监控列详细
export function getCamera(cameraId) {
  return request({
    url: '/v1/beam/cameras/' + cameraId,
    method: 'get'
  })
}

// 新增监控列
export function addCamera(data) {
  return request({
    url: '/v1/beam/cameras',
    method: 'post',
    data: data
  })
}

// 修改监控列
export function updateCamera(data) {
  return request({
    url: '/v1/beam/cameras',
    method: 'put',
    data: data
  })
}

// 删除监控列
export function delCamera(cameraId) {
  return request({
    url: '/v1/beam/cameras/' + cameraId,
    method: 'delete'
  })
}

// 导出监控列
export function exportCamera(query) {
  return request({
    url: '/v1/beam/cameras/export',
    method: 'get',
    params: query
  })
}
