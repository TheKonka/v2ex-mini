import Taro from '@tarojs/taro';
import { useMemo, useRef } from 'react';

export default function useNavBarHeight() {
	const { current: menuButtonBoundingClient } = useRef<Taro.getMenuButtonBoundingClientRect.Rect>(Taro.getMenuButtonBoundingClientRect());
	const { current: systemInfo } = useRef<Taro.getSystemInfoSync.Result>(Taro.getSystemInfoSync());
	const topFromMenuButton = menuButtonBoundingClient.top;
	const menuButtonHeight = menuButtonBoundingClient.height;

	const navbarHeight = useMemo(() => {
		if (!topFromMenuButton || !menuButtonHeight) {
			return (systemInfo.statusBarHeight ?? 0) + 44;
		}

		if (systemInfo.statusBarHeight) {
			return systemInfo.statusBarHeight + Math.abs(topFromMenuButton - systemInfo.statusBarHeight) * 2 + menuButtonHeight;
		}

		return topFromMenuButton + menuButtonHeight + 8;
	}, [menuButtonHeight, topFromMenuButton, systemInfo.statusBarHeight]);

	return {
		navbarHeight,
		menuButtonBoundingClient,
		systemInfo
	};
}
