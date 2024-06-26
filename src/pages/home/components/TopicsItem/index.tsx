import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getProxyImage } from '@/helpers/img';
import './index.scss';

const TopicItem: React.FC<TabTopic> = (item) => {
	return (
		<>
			<View
				key={item.topic_id}
				className="topics-item"
				onClick={() => {
					Taro.navigateTo({
						url: `/pages/topics-detail/index?id=${item.topic_id}`
					});
				}}
			>
				<View className="topics-item-meta">
					<Image
						src={getProxyImage(item.avatar)}
						mode="aspectFit"
						className="topics-item-meta-avatar"
						lazyLoad
						onClick={(e) => {
							e.stopPropagation();
							Taro.navigateTo({
								url: `/pages/member/index?username=${item.username}`
							});
						}}
					/>
					<View>
						<View className="topics-item-meta-username">{item.username}</View>
						<View className="time" style={{ display: 'flex', flexDirection: 'row' }}>
							<Text>{item.update_time}</Text>
							<Text> · </Text>
							<Text>{`${item.replay_num}条回复`}</Text>
						</View>
					</View>
					<View
						className="topics-item-meta-node"
						onClick={(e) => {
							e.stopPropagation();
							Taro.navigateTo({
								url: `/pages/topics-of-node/index?node=${item.node_id}&node_title=${item.node_name}`
							});
						}}
					>
						{item.node_name}
					</View>
				</View>

				<Text className="topics-item-title" decode>
					{item.title}
				</Text>
			</View>
		</>
	);
};

export default TopicItem;
