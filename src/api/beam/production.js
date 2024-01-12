import request from '@/utils/request'

// 查询试验台账列表
export function listProduction(query) {
  return request({
    url: '/v1/beam/productions',
    method: 'get',
    params: query
  })
}

// 查询试验台账详细
export function getProduction(ledgerId) {
  return request({
    url: '/v1/beam/productions/' + ledgerId,
    method: 'get'
  })
}

// 新增试验台账
export function addProduction(data) {
  return request({
    url: '/v1/beam/productions',
    method: 'post',
    data: data
  })
}

// 修改试验台账
export function updateProduction(data) {
  return request({
    url: '/v1/beam/productions',
    method: 'put',
    data: data
  })
}

// 删除试验台账
export function delProduction(ledgerId) {
  return request({
    url: '/v1/beam/productions/' + ledgerId,
    method: 'delete'
  })
}

// 导出试验台账
export function exportProduction(query) {
  return request({
    url: '/v1/beam/productions/export',
    method: 'get',
    params: query
  })
}
