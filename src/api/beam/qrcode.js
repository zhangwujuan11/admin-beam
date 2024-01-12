import request from '@/utils/request'

// 查询梁片二维码列表
export function listQrcode(query) {
	return request({
		url: '/v1/beam/qrcodes',
		method: 'get',
		params: query
	})
}

// 查询梁片二维码详细
export function getQrcode(qrId) {
	return request({
		url: '/v1/beam/qrcodes/' + qrId,
		method: 'get'
	})
}

// 新增梁片二维码
export function addQrcode(data) {
	return request({
		url: '/v1/beam/qrcodes',
		method: 'post',
		data: data
	})
}

// 修改梁片二维码
export function updateQrcode(data) {
	return request({
		url: '/v1/beam/qrcodes',
		method: 'put',
		data: data
	})
}

// 删除梁片二维码
export function delQrcode(qrId) {
	return request({
		url: '/v1/beam/qrcodes/' + qrId,
		method: 'delete'
	})
}

// 导出梁片二维码
export function exportQrcode(query) {
	return request({
		url: '/v1/beam/qrcodes/export',
		method: 'get',
		params: query
	})
}
