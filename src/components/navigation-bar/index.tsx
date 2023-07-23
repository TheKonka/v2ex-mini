import classNames from 'classnames';
import { useThrottledCallback } from 'use-debounce';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, View } from '@tarojs/components';
import Taro, { usePageScroll } from '@tarojs/taro';
import backImg from '@/assets/back.png';
import './index.scss';

interface Props {
	title?: string;
	color?: string;
	backdropFilter?: boolean;
	showBackIcon?: boolean;
	onInit?: (res: any) => void;
	className?: string;
}

const NavigationBar: React.FC<Props> = (props) => {
	const { showBackIcon = true } = props;

	const { current: menuButtonBoundingClient } = useRef<Taro.getMenuButtonBoundingClientRect.Rect>(Taro.getMenuButtonBoundingClientRect());
	const { current: systemInfo } = useRef<Taro.getSystemInfoSync.Result>(Taro.getSystemInfoSync());
	const [opacity, setOpacity] = useState(0);

	const handleBack = useCallback(() => {
		Taro.navigateBack({ delta: 1 }).catch(() => {
			Taro.switchTab({ url: `/pages/home/index` });
		});
	}, []);

	const handleScroll = useThrottledCallback((scrollTop) => {
		if (scrollTop > 20) {
			const o = scrollTop / (systemInfo.windowWidth * 0.3);
			setOpacity(Math.min(Math.abs(o), 1));
		} else {
			setOpacity(0);
		}
	}, 100);

	usePageScroll((res) => {
		handleScroll(res.scrollTop);
	});

	const navbarHeight = useMemo(() => {
		if (menuButtonBoundingClient.top && menuButtonBoundingClient.height) {
			if (systemInfo.statusBarHeight) {
				return (
					systemInfo.statusBarHeight +
					Math.abs(menuButtonBoundingClient.top - systemInfo.statusBarHeight) * 2 +
					menuButtonBoundingClient.height
				);
			} else {
				return menuButtonBoundingClient.top + menuButtonBoundingClient.height + 8;
			}
		} else {
			return (systemInfo.statusBarHeight ?? 0) + 44;
		}
	}, [menuButtonBoundingClient.height, menuButtonBoundingClient.top, systemInfo.statusBarHeight]);

	useEffect(() => {
		props.onInit?.({
			height: navbarHeight,
			statusBarHeight: systemInfo.statusBarHeight
		});
	}, [navbarHeight, props, systemInfo.statusBarHeight]);

	return (
		<>
			<View
				className={classNames('czt-navbar', { 'czt-navbar-drop': props.backdropFilter }, props.className)}
				style={{
					height: navbarHeight
					// background: `rgba(255,255,255,${opacity})`
				}}
			>
				<View className="wrapper" style={{ height: menuButtonBoundingClient.height, top: menuButtonBoundingClient.top }}>
					{!!showBackIcon && (
						<View className="czt-navbar-back" onClick={handleBack}>
							<Image src={backImg} />
						</View>
					)}

					<View className="czt-navbar-title">{props.title}</View>
				</View>
			</View>
		</>
	);
};

export default React.memo(NavigationBar);
