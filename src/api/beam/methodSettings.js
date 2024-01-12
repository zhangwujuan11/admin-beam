import request from '@/utils/request'

// 查询工法列表
export function listMethodSettings(query) {
  return request({
    url: '/v1/beam/methodSettingss',
    method: 'get',
    params: query
  })
}

// 查询工法详细
export function getMethodSettings(methodSettingsId) {
  return request({
    url: '/v1/beam/methodSettingss/' + methodSettingsId,
    method: 'get'
  })
}

// 新增工法
export function addMethodSettings(data) {
  return request({
    url: '/v1/beam/methodSettingss',
    method: 'post',
    data: data
  })
}

// 修改工法
export function updateMethodSettings(data) {
  return request({
    url: '/v1/beam/methodSettingss',
    method: 'put',
    data: data
  })
}

// 删除工法
export function delMethodSettings(methodSettingsId) {
  return request({
    url: '/v1/beam/methodSettingss/' + methodSettingsId,
    method: 'delete'
  })
}

// 导出工法
export function exportMethodSettings(query) {
  return request({
    url: '/v1/beam/methodSettingss/export',
    method: 'get',
    params: query
  })
}
