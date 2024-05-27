import classNames from 'classnames';
import { useThrottledCallback } from 'use-debounce';
import React, { useState } from 'react';
import { Image, View } from '@tarojs/components';
import Taro, { usePageScroll } from '@tarojs/taro';
import backImg from '@/assets/back.png';
import './index.scss';
import useNavBarHeight from '@/hooks/useNavBarHeight';

interface Props {
	title?: string;
	color?: string;
	backdropFilter?: boolean;
	showBackIcon?: boolean;
	className?: string;
}

const NavigationBar: React.FC<Props> = (props) => {
	const { showBackIcon = true } = props;

	const { navbarHeight, menuButtonBoundingClient, systemInfo } = useNavBarHeight();

	const [opacity, setOpacity] = useState(0);

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
						<View
							className="czt-navbar-back"
							onClick={() => {
								Taro.navigateBack({ delta: 1 }).catch(() => {
									Taro.switchTab({ url: `/pages/home/index` });
								});
							}}
						>
							<Image src={backImg} mode={'aspectFit'} />
						</View>
					)}

					<View className="czt-navbar-title">{props.title}</View>
				</View>
			</View>
		</>
	);
};

export default React.memo(NavigationBar);
