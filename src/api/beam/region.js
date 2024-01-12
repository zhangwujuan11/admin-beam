import request from '@/utils/request'

// 查询梁场区域配置;列表
export function listRegion(query) {
  return request({
    url: '/v1/beam/regions',
    method: 'get',
    params: query
  })
}

// 查询梁场区域配置;详细
export function getRegion(regionId) {
  return request({
    url: '/v1/beam/regions/' + regionId,
    method: 'get'
  })
}

// 新增梁场区域配置;
export function addRegion(data) {
  return request({
    url: '/v1/beam/regions',
    method: 'post',
    data: data
  })
}

// 修改梁场区域配置;
export function updateRegion(data) {
  return request({
    url: '/v1/beam/regions',
    method: 'put',
    data: data
  })
}

// 删除梁场区域配置;
export function delRegion(regionId) {
  return request({
    url: '/v1/beam/regions/' + regionId,
    method: 'delete'
  })
}

// 导出梁场区域配置;
export function exportRegion(query) {
  return request({
    url: '/v1/beam/regions/export',
    method: 'get',
    params: query
  })
}
