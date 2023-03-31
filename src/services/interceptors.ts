import Taro from '@tarojs/taro';

const customInterceptor = (chain: Taro.Chain) => {
	const { requestParams } = chain;
	return chain
		.proceed(requestParams)
		.then((res: Taro.request.SuccessCallbackResult) => {
			if (res.statusCode === 200) {
				return Promise.resolve(res.data);
			} else {
				return Promise.reject(res);
			}
		})
		.catch((e) => {
			Taro.showToast({
				title: e.errMsg || '请求失败',
				icon: 'none'
			});
			return Promise.reject(e);
		});
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor, Taro.interceptors.timeoutInterceptor];

export default interceptors;
