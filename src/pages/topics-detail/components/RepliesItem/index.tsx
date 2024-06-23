import React from 'react';
import MarkDown from '@/components/Markdown';
import { View, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getProxyImage } from '@/helpers/img';
import { getTimeFromNow } from '@/helpers/time';
import './index.scss';

interface Props {
	item: Api.Replies;
	index: number;
	op: boolean;
}
const RepliesItem: React.FC<Props> = ({ item, index, op }) => {
	return (
		<>
			<View key={item.id} className="replies-item">
				<View className="author">
					<Text className="floor">#{index + 1}</Text>
					<Image
						src={getProxyImage(item.member.avatar)}
						className="avatar"
						lazyLoad
						onClick={(e) => {
							e.stopPropagation();
							Taro.navigateTo({
								url: `/pages/member/index?username=${item.member.username}`
							});
						}}
					/>
					<View>
						<View className="author-username">{item.member.username}</View>
						<View className="time">{getTimeFromNow(item.created)}</View>
					</View>
				</View>

				<MarkDown nodes={item.content} className={op ? '' : 'bg-main'} />
			</View>
		</>
	);
};

export default RepliesItem;
