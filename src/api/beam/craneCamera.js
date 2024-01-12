import request from '@/utils/request'

// 查询龙门吊关联摄像头;列表
export function listCraneCamera(query) {
  return request({
    url: '/v1/beam/craneCameras',
    method: 'get',
    params: query
  })
}

// 查询龙门吊关联摄像头;详细
export function getCraneCamera(id) {
  return request({
    url: '/v1/beam/craneCameras/' + id,
    method: 'get'
  })
}

// 新增龙门吊关联摄像头;
export function addCraneCamera(data) {
  return request({
    url: '/v1/beam/craneCameras',
    method: 'post',
    data: data
  })
}

// 修改龙门吊关联摄像头;
export function updateCraneCamera(data) {
  return request({
    url: '/v1/beam/craneCameras',
    method: 'put',
    data: data
  })
}

// 删除龙门吊关联摄像头;
export function delCraneCamera(id) {
  return request({
    url: '/v1/beam/craneCameras/' + id,
    method: 'delete'
  })
}

// 导出龙门吊关联摄像头;
export function exportCraneCamera(query) {
  return request({
    url: '/v1/beam/craneCameras/export',
    method: 'get',
    params: query
  })
}
