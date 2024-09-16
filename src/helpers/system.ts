import Taro from '@tarojs/taro';

export function isPC() {
	const { platform } = Taro.getDeviceInfo();

	// platform 枚举可见 https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getSystemInfo.html
	return platform === 'windows' || platform === 'mac';
}
