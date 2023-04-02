import Taro from '@tarojs/taro';

export function checkUpdate(auto?: boolean) {
	const updateManager = Taro.getUpdateManager();
	updateManager.onCheckForUpdate((res) => {
		if (!res.hasUpdate && !auto) {
			Taro.showToast({
				title: '当前已经是最新版本',
				icon: 'none'
			});
		}
	});
	updateManager.onUpdateReady(() => {
		Taro.showModal({
			title: '更新提示',
			content: '新版本已经准备好，是否重新启动小程序？',
			success(res) {
				if (res.confirm) {
					updateManager.applyUpdate();
				}
			}
		});
	});
	updateManager.onUpdateFailed(() => {
		Taro.showModal({
			title: '已经有新版本了哟~',
			content: '新版本已经上线啦~，请您关闭当前小程序，重新搜索打开哟~',
			showCancel: false
		});
	});
}
