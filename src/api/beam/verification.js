import request from '@/utils/request'

// 查询工序报验列表
export function listVerification(query) {
  return request({
    url: '/v1/beam/verifications',
    method: 'get',
    params: query
  })
}

// 查询工序报验详细
export function getVerification(processVerificationId) {
  return request({
    url: '/v1/beam/verifications/' + processVerificationId,
    method: 'get'
  })
}

// 新增工序报验
export function addVerification(data) {
  return request({
    url: '/v1/beam/verifications',
    method: 'post',
    data: data
  })
}

// 修改工序报验
export function updateVerification(data) {
  return request({
    url: '/v1/beam/verifications',
    method: 'put',
    data: data
  })
}

// 删除工序报验
export function delVerification(processVerificationId) {
  return request({
    url: '/v1/beam/verifications/' + processVerificationId,
    method: 'delete'
  })
}

// 导出工序报验
export function exportVerification(query) {
  return request({
    url: '/v1/beam/verifications/export',
    method: 'get',
    params: query
  })
}
