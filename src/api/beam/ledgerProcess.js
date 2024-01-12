import request from '@/utils/request'

// 查询工序执行台账列表
export function listLedgerProcess(query) {
  return request({
    url: '/v1/beam/ledgerProcesss',
    method: 'get',
    params: query
  })
}

// 查询工序执行台账详细
export function getLedgerProcess(ledgerProcessId) {
  return request({
    url: '/v1/beam/ledgerProcesss/' + ledgerProcessId,
    method: 'get'
  })
}

// 新增工序执行台账
export function addLedgerProcess(data) {
  return request({
    url: '/v1/beam/ledgerProcesss',
    method: 'post',
    data: data
  })
}

// 修改工序执行台账
export function updateLedgerProcess(data) {
  return request({
    url: '/v1/beam/ledgerProcesss',
    method: 'put',
    data: data
  })
}

// 删除工序执行台账
export function delLedgerProcess(ledgerProcessId) {
  return request({
    url: '/v1/beam/ledgerProcesss/' + ledgerProcessId,
    method: 'delete'
  })
}

// 导出工序执行台账
export function exportLedgerProcess(query) {
  return request({
    url: '/v1/beam/ledgerProcesss/export',
    method: 'get',
    params: query
  })
}
