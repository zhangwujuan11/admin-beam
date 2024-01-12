import request from '@/utils/request'

// 查询台座-梁片关联;列表
export function listSeatBeam(query) {
  return request({
    url: '/v1/beam/seatBeams',
    method: 'get',
    params: query
  })
}

// 查询台座-梁片关联;详细
export function getSeatBeam(id) {
  return request({
    url: '/v1/beam/seatBeams/' + id,
    method: 'get'
  })
}

// 新增台座-梁片关联;
export function addSeatBeam(data) {
  return request({
    url: '/v1/beam/seatBeams',
    method: 'post',
    data: data
  })
}

// 修改台座-梁片关联;
export function updateSeatBeam(data) {
  return request({
    url: '/v1/beam/seatBeams',
    method: 'put',
    data: data
  })
}

// 删除台座-梁片关联;
export function delSeatBeam(id) {
  return request({
    url: '/v1/beam/seatBeams/' + id,
    method: 'delete'
  })
}

// 导出台座-梁片关联;
export function exportSeatBeam(query) {
  return request({
    url: '/v1/beam/seatBeams/export',
    method: 'get',
    params: query
  })
}
