import request from '@/utils/request'

// 查询工法列表
export function listmethodList(query) {
	return request({
		url: '/v1/beam/settingss',
		method: 'get',
		params: query
	})
}

// 新增工法
export function addmethodList(data) {
	return request({
		url: '/v1/beam/settingss',
		method: 'post',
		data: data
	})
}

// 修改工法
export function editmethodList(data) {
	return request({
		url: '/v1/beam/settingss',
		method: 'put',
		data: data
	})
}

// 删除工法
export function delmethodList(methodSettingsId) {
	return request({
		url: `/v1/beam/settingss/` + methodSettingsId,
		method: 'delete'
	})
}

// 获取工法详细信息
export function getmethodList(methodSettingsId) {
	return request({
		url: `/v1/beam/settingss/` + methodSettingsId,
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
