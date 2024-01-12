import request from '@/utils/request'

// 查询工单列表
export function beamOrders(query) {
	return request({
		url: '/v1/beam/orders',
		method: 'get',
		params: query
	})
}

// 查询桥梁列表
export function beamBridges(query) {
	return request({
		url: '/v1/beam/bridges',
		method: 'get',
		params: query
	})
}

// 查询工单详细信息
export function ordersDetails(query) {
	return request({
		url: `/v1/beam/orders/${query}`,
		method: 'get'
	})
}

// 查询梁片任务列表
export function listTasks(query) {
	return request({
		url: '/v1/beam/tasks',
		method: 'get',
		params: query
	})
}

// 获取工法详细信息
export function getmethodList(methodSettingsId) {
	return request({
		url: `/v1/beam/settingss/` + methodSettingsId,
		method: 'get'
	})
}

// 修改梁片任务
export function updateBeamTasks(data) {
	return request({
		url: '/v1/beam/tasks',
		method: 'put',
		data: data
	})
}

// 查询空闲台座列表
export function freelist(query) {
	return request({
		url: `/v1/beam/seatSettingss/freelist/${query}`,
		method: 'get'
	})
}

// 查询机料模板列表
export function listTemplate(query) {
	return request({
		url: '/v1/beam/templates',
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

// 查询施工班组
export function getConstructionCrew() {
	return request({
		url: '/system/dept/constructionCrew',
		method: 'get'
	})
}
