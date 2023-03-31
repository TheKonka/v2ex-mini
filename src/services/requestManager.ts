import Taro from '@tarojs/taro';
import interceptors from './interceptors';

interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem));

export default class RequestManager {
	private static _requset(url: string, method: keyof Taro.request.Method = 'GET'): Promise<any> {
		return Taro.request({
			url: url.startsWith('http') ? url : __API_URL__ + url,
			method,
			header: {
				'content-type': 'application/json',
				'authorization': `Bearer ${__PERSONAL_ACCESS_TOKEN__}`
			}
		});
	}

	public static get(url: string): Promise<any> {
		return RequestManager._requset(url, 'GET');
	}

	public static post(url: string): Promise<any> {
		return RequestManager._requset(url, 'POST');
	}
}
