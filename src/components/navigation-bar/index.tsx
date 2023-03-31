import classNames from 'classnames';
import { useThrottledCallback } from 'use-debounce';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, View } from '@tarojs/components';
import Taro, { usePageScroll } from '@tarojs/taro';
import backImg from '@/assets/back.png';
import './index.scss';

interface Props {
	title?: string;
	backdropFilter?: boolean;
	showBackIcon?: boolean;
	onInit?: (res: any) => void;
	fillHeight?: boolean;
	autoBackground?: boolean;
}

const NavigationBar: React.FC<Props> = (props) => {
	const showBackIcon = process.env.TARO_ENV === 'alipay' ? false : !!props.showBackIcon;

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
		//	if (process.env.TARO_ENV === 'weapp') {
		handleScroll(res.scrollTop);
		//	}
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
				className={classNames('czt-navbar', { 'czt-navbar-drop': props.backdropFilter })}
				style={{
					height: navbarHeight,
					background: props.autoBackground ? `rgba(255,255,255,${opacity})` : 'transparent'
				}}
			>
				{showBackIcon && (
					<View
						style={{ height: menuButtonBoundingClient.height, top: menuButtonBoundingClient.top }}
						className="czt-navbar-back"
						onClick={handleBack}
					>
						<Image src={backImg} />
					</View>
				)}
				{props.title && (
					<View className="czt-navbar-title" style={{ height: menuButtonBoundingClient.height, top: menuButtonBoundingClient.top }}>
						{props.title}
					</View>
				)}
			</View>
			{props.fillHeight && (
				<View
					style={{
						height: navbarHeight
					}}
				/>
			)}
		</>
	);
};

NavigationBar.defaultProps = {
	showBackIcon: true,
	autoBackground: true
};

export default React.memo(NavigationBar);
