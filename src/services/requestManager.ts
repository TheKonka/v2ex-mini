import Taro from '@tarojs/taro';
import interceptors from './interceptors';

interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem));

export default class RequestManager {
	private static _requset(url: string, method: keyof Taro.request.Method = 'GET'): Promise<any> {
		const header = {
			'content-type': 'application/json'
		};
		if (url.startsWith('api/v2/')) {
			Reflect.set(header, 'authorization', `Bearer ${process.env.TARO_APP_PERSONAL_ACCESS_TOKEN}`);
		}
		return Taro.request({
			url: url.startsWith('http') ? url : process.env.TARO_APP_API_URL + url,
			method,
			header
		});
	}

	public static get(url: string): Promise<any> {
		return RequestManager._requset(url, 'GET');
	}

	public static post(url: string): Promise<any> {
		return RequestManager._requset(url, 'POST');
	}
}
