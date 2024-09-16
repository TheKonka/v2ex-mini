import Taro from '@tarojs/taro';
import { useMemo, useRef } from 'react';

export default function useNavBarHeight() {
	const { current: menuButtonBoundingClient } = useRef<Taro.getMenuButtonBoundingClientRect.Rect>(Taro.getMenuButtonBoundingClientRect());
	const { current: windowInfo } = useRef(Taro.getWindowInfo());
	const topFromMenuButton = menuButtonBoundingClient.top;
	const menuButtonHeight = menuButtonBoundingClient.height;

	const navbarHeight = useMemo(() => {
		if (!topFromMenuButton || !menuButtonHeight) {
			return (windowInfo.statusBarHeight ?? 0) + 44;
		}

		if (windowInfo.statusBarHeight) {
			return windowInfo.statusBarHeight + Math.abs(topFromMenuButton - windowInfo.statusBarHeight) * 2 + menuButtonHeight;
		}

		return topFromMenuButton + menuButtonHeight + 8;
	}, [menuButtonHeight, topFromMenuButton, windowInfo.statusBarHeight]);

	return {
		navbarHeight,
		menuButtonBoundingClient,
		windowInfo
	};
}
