import request from '@/utils/request'

// 查询实验实时数据列表
export function listGrouting(query) {
	return request({
		url: '/v1/beam/groutings',
		method: 'get',
		params: query
	})
}

// 查询实验实时数据详细
export function getGrouting(groutingId) {
	return request({
		url: '/v1/beam/groutings/' + groutingId,
		method: 'get'
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

// 新增实验实时数据
export function addGrouting(data) {
	return request({
		url: '/v1/beam/groutings',
		method: 'post',
		data: data
	})
}

// 修改实验实时数据
export function updateGrouting(data) {
	return request({
		url: '/v1/beam/groutings',
		method: 'put',
		data: data
	})
}

// 删除实验实时数据
export function delGrouting(groutingId) {
	return request({
		url: '/v1/beam/groutings/' + groutingId,
		method: 'delete'
	})
}

// 导出实验实时数据
export function exportGrouting(query) {
	return request({
		url: '/v1/beam/groutings/export',
		method: 'get',
		params: query
	})
}
