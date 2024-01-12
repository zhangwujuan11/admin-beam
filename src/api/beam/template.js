import request from '@/utils/request'

// 查询机料模板列表
export function listTemplate(query) {
  return request({
    url: '/v1/beam/templates',
    method: 'get',
    params: query
  })
}

// 查询机料模板详细
export function getTemplate(templateId) {
  return request({
    url: '/v1/beam/templates/' + templateId,
    method: 'get'
  })
}

// 新增机料模板
export function addTemplate(data) {
  return request({
    url: '/v1/beam/templates',
    method: 'post',
    data: data
  })
}

// 修改机料模板
export function updateTemplate(data) {
  return request({
    url: '/v1/beam/templates',
    method: 'put',
    data: data
  })
}

// 删除机料模板
export function delTemplate(templateId) {
  return request({
    url: '/v1/beam/templates/' + templateId,
    method: 'delete'
  })
}

// 导出机料模板
export function exportTemplate(query) {
  return request({
    url: '/v1/beam/templates/export',
    method: 'get',
    params: query
  })
}
