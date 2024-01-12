import request from '@/utils/request'

// 查询张拉实验实时数据列表
export function listPrestressing(query) {
	return request({
		url: '/v1/beam/prestressings',
		method: 'get',
		params: query
	})
}

// 查询张拉实验实时数据详细
export function getPrestressing(prestressingId) {
	return request({
		url: '/v1/beam/prestressings/' + prestressingId,
		method: 'get'
	})
}

// 新增张拉实验实时数据
export function addPrestressing(data) {
	return request({
		url: '/v1/beam/prestressings',
		method: 'post',
		data: data
	})
}

// 修改张拉实验实时数据
export function updatePrestressing(data) {
	return request({
		url: '/v1/beam/prestressings',
		method: 'put',
		data: data
	})
}

// 删除张拉实验实时数据
export function delPrestressing(prestressingId) {
	return request({
		url: '/v1/beam/prestressings/' + prestressingId,
		method: 'delete'
	})
}

// 导出张拉实验实时数据
export function exportPrestressing(query) {
	return request({
		url: '/v1/beam/prestressings/export',
		method: 'get',
		params: query
	})
}

// 查询梁片信息
export function getBeams() {
	return request({
		url: '/v1/beam/beams',
		method: 'get'
	})
}

// 查询孔道信息
export function getHoles() {
	return request({
		url: '/v1/beam/holes',
		method: 'get'
	})
}
