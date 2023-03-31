import React, { useState } from 'react';
import { View, Image, Text } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import { getProxyImage } from '@/helpers/img';
import { getTimeFromNow } from '@/helpers/time';
import { getTodayHotTopics } from '@/services/api';
import './index.scss';

const Index: React.FC = () => {
	const [todayHotTopics, setTodayHotTopics] = useState<Api.TodayHotTopics[]>([]);

	useLoad(() => {
		getTodayHotTopics().then((res) => {
			setTodayHotTopics(res);
		});
	});

	return (
		<>
			{todayHotTopics.map((item) => {
				return (
					<>
						<View
							key={item.id}
							className="topics-item"
							onClick={() => {
								Taro.navigateTo({
									url: `/pages/topics-detail/index?id=${item.id}`
								});
							}}
						>
							<View className="topics-item-member">
								<Image src={getProxyImage(item.member.avatar_mini)} mode="aspectFit" className="topics-item-member-avatar" lazyLoad />
								<View>
									<View className="topics-item-member-username">{item.member.username}</View>
									<View className="time">
										<Text>{getTimeFromNow(item.created * 1000)}</Text>
										<Text> · </Text>
										<Text>{`${item.replies}条回复`}</Text>
									</View>
								</View>
							</View>

							<View className="topics-item-title">{item.title}</View>
						</View>
					</>
				);
			})}
		</>
	);
};

export default Index;
