import React from 'react';
import { View } from '@tarojs/components';
import './index.scss';

const Loading: React.FC = () => {
	return (
		<>
			<View className="loading-container">
				<View className="loader" />
			</View>
		</>
	);
};

export default Loading;
