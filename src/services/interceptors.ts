import Taro from '@tarojs/taro';
import { refreshToken } from './api';

const queue: any[] = [];
let isTokenRefreshing = false;

const customInterceptor = (chain: Taro.Chain) => {
	const { requestParams } = chain;
	return chain
		.proceed(requestParams)
		.then((res: Taro.request.SuccessCallbackResult) => {
			return new Promise((resolve, reject) => {
				switch (res.statusCode) {
					case 200:
						resolve(res.data);
						break;
					case 401:
						queue.push({ resolve, reject, requestParams });
						if (!isTokenRefreshing) {
							isTokenRefreshing = true;
							refreshToken().then((token) => {
								Taro.setStorageSync('token', token);
								while (queue.length) {
									const req = queue.shift();
									const newParam = req.requestParams;
									req.resolve(
										Taro.request({
											url: newParam.url,
											data: newParam.data,
											method: newParam.method,
											header: {
												'content-type': newParam?.headers?.['content-type'] || 'application/json',
												'authorization': `Bearer ${token}`
											}
										})
									);
								}
								isTokenRefreshing = false;
							});
						}
						break;
					default:
						reject(res);
						break;
				}
			});
		})
		.catch((e: any) => {
			// Taro.showToast({
			// 	title: e.errMsg || '请求失败',
			// 	icon: 'none'
			// });
			return Promise.reject(e);
		});
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor, Taro.interceptors.timeoutInterceptor];

export default interceptors;
