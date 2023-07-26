import React, { useState } from 'react';
import { View, Image, Text, ScrollView } from '@tarojs/components';
import Taro, { useLoad, useShareAppMessage } from '@tarojs/taro';
import { getProxyImage } from '@/helpers/img';
import { getTimeFromNow } from '@/helpers/time';
import { getTodayHotTopics } from '@/services/api';
import './index.scss';
import NavigationBar from '@/components/navigation-bar';

const Index: React.FC = () => {
	const [todayHotTopics, setTodayHotTopics] = useState<Api.TodayHotTopics[]>(() => Taro.getStorageSync('hot_list') || []);

	useLoad(() => {
		getTodayHotTopics().then((res) => {
			setTodayHotTopics(res);
			Taro.setStorage({
				key: 'hot_list',
				data: res
			});
		});
	});

	useShareAppMessage(() => {
		return {
			title: '今日热议主题',
			path: '/pages/hot/index'
		};
	});

	return (
		<>
			<NavigationBar title="今日热议主题" showBackIcon={false} />

			<ScrollView scrollY enableFlex enhanced scrollWithAnimation type="custom" className="scrollview">
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
								<View className="topics-item-meta">
									<Image
										src={getProxyImage(item.member.avatar_large)}
										mode="aspectFit"
										className="topics-item-meta-avatar"
										lazyLoad
										onClick={(e) => {
											e.stopPropagation();
											Taro.navigateTo({
												url: `/pages/member/index?username=${item.member.username}`
											});
										}}
									/>
									<View>
										<View className="topics-item-meta-username">{item.member.username}</View>
										<View className="time">
											<Text>{'发布于 ' + getTimeFromNow(item.created * 1000)}</Text>
											<Text> · </Text>
											<Text>{`${item.replies}条回复`}</Text>
										</View>
									</View>
									<View
										className="topics-item-meta-node"
										onClick={(e) => {
											e.stopPropagation();
											Taro.navigateTo({
												url: `/pages/topics-of-node/index?node=${item.node.name}&node_title=${item.node.title}`
											});
										}}
									>
										{item.node.title}
									</View>
								</View>

								<View className="topics-item-title">{item.title}</View>
							</View>
						</>
					);
				})}
				{todayHotTopics.length > 0 && (
					<View className="no-more" style={{ textAlign: 'center' }}>
						<Text>—— 我是有底线的 ——</Text>
					</View>
				)}
			</ScrollView>
		</>
	);
};

export default Index;
