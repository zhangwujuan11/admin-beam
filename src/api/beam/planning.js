import request from '@/utils/request'

// 查询计划编制列表
export function listPlanning(query) {
	return request({
		url: '/v1/beam/plans',
		method: 'get',
		params: query
	})
}

// 查询桥梁列表
export function listBridge(query) {
	return request({
		url: '/v1/beam/bridges',
		method: 'get',
		params: query
	})
}

// 查询计划编制详细
export function getPlanning(bridgePlanningId) {
	return request({
		url: '/v1/beam/plans/' + bridgePlanningId,
		method: 'get'
	})
}

// 新增计划编制
export function addPlanning(data) {
	return request({
		url: '/v1/beam/plans',
		method: 'post',
		data: data
	})
}

// 修改计划编制
export function updatePlanning(data) {
	return request({
		url: '/v1/beam/plans',
		method: 'put',
		data: data
	})
}

// 删除计划编制
export function delPlanning(bridgePlanningId) {
	return request({
		url: '/v1/beam/plans/' + bridgePlanningId,
		method: 'delete'
	})
}

// 导出计划编制
export function exportPlanning(query) {
	return request({
		url: '/v1/beam/plans/actions/export',
		method: 'get',
		responseType: 'blob',
		params: query
	})
}

// 查询梁片列表
export function listBeam(query) {
	return request({
		url: '/v1/beam/beams',
		method: 'get',
		params: query
	})
}
// 计划模版导出
export function importTemplate() {
	return request({
		url: '/v1/beam/beams/importTemplate',
		method: 'get',
		responseType: 'blob'
	})
}
// 计划模版导入
export function importTData(data) {
	return request({
		url: '/v1/beam/beams/importData',
		method: 'post',
		data: data
		// Headers: {
		// 	'Content-type': 'multipart/form-data'
		// }
	})
}
