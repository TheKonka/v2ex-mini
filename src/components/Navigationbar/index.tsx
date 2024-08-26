import classNames from 'classnames';
import React from 'react';
import { Image, View } from '@tarojs/components';
import backImg from '@/assets/back.png';
import './index.scss';
import useNavBarHeight from '@/hooks/useNavBarHeight';
import { safeNavigateBack } from '@/helpers/route';

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

	// const [opacity, setOpacity] = useState(0);

	// const handleScroll = useThrottledCallback((scrollTop) => {
	// 	if (scrollTop > 20) {
	// 		const o = scrollTop / (systemInfo.windowWidth * 0.3);
	// 		setOpacity(Math.min(Math.abs(o), 1));
	// 	} else {
	// 		setOpacity(0);
	// 	}
	// }, 100);

	// usePageScroll((res) => {
	// 	handleScroll(res.scrollTop);
	// });

	return (
		<>
			<View
				className={classNames('navbar', { 'navbar-drop': props.backdropFilter }, props.className)}
				style={{
					height: navbarHeight
					// background: `rgba(255,255,255,${opacity})`
				}}
			>
				<View className="wrapper" style={{ height: menuButtonBoundingClient.height, top: menuButtonBoundingClient.top }}>
					{!!showBackIcon && (
						<View
							className="navbar-back"
							onClick={() => {
								safeNavigateBack();
							}}
						>
							<Image src={backImg} mode={'aspectFit'} />
						</View>
					)}

					<View className="navbar-title">{props.title}</View>
				</View>
			</View>
		</>
	);
};

export default React.memo(NavigationBar);
