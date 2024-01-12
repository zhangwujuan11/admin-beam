import request from '@/utils/request'

// 查询台座设置列表
export function listSeatSettings(query) {
	return request({
		url: '/v1/beam/seatSettingss',
		method: 'get',
		params: query
	})
}

// 查询台座设置详细
export function getSeatSettings(seatId) {
	return request({
		url: '/v1/beam/seatSettingss/' + seatId,
		method: 'get'
	})
}

// 新增台座设置
export function addSeatSettings(data) {
	return request({
		url: '/v1/beam/seatSettingss',
		method: 'post',
		data: data
	})
}

// 修改台座设置
export function updateSeatSettings(data) {
	return request({
		url: '/v1/beam/seatSettingss',
		method: 'put',
		data: data
	})
}

// 删除台座设置
export function delSeatSettings(seatId) {
	return request({
		url: '/v1/beam/seatSettingss/' + seatId,
		method: 'delete'
	})
}

// 初始化台座设置
export function resetSeatSettings() {
	return request({
		url: '/v1/beam/seatSettingss/reset',
		method: 'delete'
	})
}

// 导出台座设置
export function exportSeatSettings(query) {
	return request({
		url: '/v1/beam/seatSettingss/export',
		method: 'get',
		params: query
	})
}

// 查询梁场区域配置;列表
export function listRegion(query) {
	return request({
		url: '/v1/beam/regions',
		method: 'get',
		params: query
	})
}
