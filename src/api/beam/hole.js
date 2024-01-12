import request from '@/utils/request'

// 查询梁片孔道;列表
export function listHole(query) {
  return request({
    url: '/v1/beam/holes',
    method: 'get',
    params: query
  })
}

// 查询梁片孔道;详细
export function getHole(boreholeId) {
  return request({
    url: '/v1/beam/holes/' + boreholeId,
    method: 'get'
  })
}

// 新增梁片孔道;
export function addHole(data) {
  return request({
    url: '/v1/beam/holes',
    method: 'post',
    data: data
  })
}

// 修改梁片孔道;
export function updateHole(data) {
  return request({
    url: '/v1/beam/holes',
    method: 'put',
    data: data
  })
}

// 删除梁片孔道;
export function delHole(boreholeId) {
  return request({
    url: '/v1/beam/holes/' + boreholeId,
    method: 'delete'
  })
}

// 导出梁片孔道;
export function exportHole(query) {
  return request({
    url: '/v1/beam/holes/export',
    method: 'get',
    params: query
  })
}
