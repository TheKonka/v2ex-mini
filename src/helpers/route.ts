import Taro from '@tarojs/taro';

export function goHome() {
	Taro.switchTab({ url: `/pages/home/index` });
}

export function safeNavigateBack(opt?: { delta: number }) {
	const { delta = 1 } = opt || {};

	Taro.navigateBack({
		delta
	}).catch(goHome);
}
