import request from '@/utils/request'

// 查询工序检验列表
export function listInspection(query) {
  return request({
    url: '/v1/beam/inspections',
    method: 'get',
    params: query
  })
}

// 查询工序检验详细
export function getInspection(processInspectionId) {
  return request({
    url: '/v1/beam/inspections/' + processInspectionId,
    method: 'get'
  })
}

// 新增工序检验
export function addInspection(data) {
  return request({
    url: '/v1/beam/inspections',
    method: 'post',
    data: data
  })
}

// 修改工序检验
export function updateInspection(data) {
  return request({
    url: '/v1/beam/inspections',
    method: 'put',
    data: data
  })
}

// 删除工序检验
export function delInspection(processInspectionId) {
  return request({
    url: '/v1/beam/inspections/' + processInspectionId,
    method: 'delete'
  })
}

// 导出工序检验
export function exportInspection(query) {
  return request({
    url: '/v1/beam/inspections/export',
    method: 'get',
    params: query
  })
}
