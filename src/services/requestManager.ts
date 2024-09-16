import Taro from '@tarojs/taro';
import interceptors from './interceptors';

interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem));

export default class RequestManager {
	private static _requset<T>(url: string, method: keyof Taro.request.Method = 'GET') {
		const header = {
			'content-type': 'application/json'
		};
		if (url.startsWith('api/v2/')) {
			Reflect.set(header, 'authorization', `Bearer ${Taro.getStorageSync('token') || process.env.TARO_APP_PERSONAL_ACCESS_TOKEN}`);
		}
		return Taro.request({
			url: url.startsWith('http') ? url : process.env.TARO_APP_API_URL + url,
			method,
			header
		}) as unknown as Promise<T>;
	}

	public static get<T>(url: string) {
		return RequestManager._requset<T>(url, 'GET');
	}

	public static post<T>(url: string) {
		return RequestManager._requset<T>(url, 'POST');
	}
}
