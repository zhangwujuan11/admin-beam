import request from '@/utils/request'

// 查询工序列表
export function listProcess(query) {
  return request({
    url: '/v1/beam/processs',
    method: 'get',
    params: query
  })
}

// 查询工序详细
export function getProcess(processId) {
  return request({
    url: '/v1/beam/processs/' + processId,
    method: 'get'
  })
}

// 新增工序
export function addProcess(data) {
  return request({
    url: '/v1/beam/processs',
    method: 'post',
    data: data
  })
}

// 修改工序
export function updateProcess(data) {
  return request({
    url: '/v1/beam/processs',
    method: 'put',
    data: data
  })
}

// 删除工序
export function delProcess(processId) {
  return request({
    url: '/v1/beam/processs/' + processId,
    method: 'delete'
  })
}

// 导出工序
export function exportProcess(query) {
  return request({
    url: '/v1/beam/processs/export',
    method: 'get',
    params: query
  })
}
