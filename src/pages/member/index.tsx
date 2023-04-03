import React, { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro, { useLoad, useRouter, useShareAppMessage } from '@tarojs/taro';
import { getProxyImage } from '@/helpers/img';
import { getTimeFromNow } from '@/helpers/time';
import { getMemberByUsername, getTpoicsByUsername } from '@/services/api';
import './index.scss';

const Index: React.FC = () => {
	const router = useRouter();
	const { username } = router.params;

	const [memberInfo, setMemberInfo] = useState<Api.Member>();
	const [topics, setTopics] = useState<Api.TopicsOfNode[]>([]);

	useLoad(() => {
		if (username) {
			Taro.setNavigationBarTitle({
				title: username
			});
			getMemberByUsername(username).then((res) => {
				setMemberInfo(res);
			});
			getTpoicsByUsername(username).then((res) => {
				setTopics(res);
			});
		}
	});

	useShareAppMessage(() => {
		return {
			title: username || '会员信息',
			path: '/pages/member/index'
		};
	});

	return (
		<>
			{memberInfo && (
				<View className="node">
					<Image
						src={getProxyImage(memberInfo.avatar_xlarge || memberInfo.avatar_large)}
						mode="aspectFit"
						className="node-avatar"
						onClick={() => {
							Taro.previewImage({
								urls: [getProxyImage(memberInfo.avatar_xlarge || memberInfo.avatar_large)],
								showmenu: true
							});
						}}
					/>
					<View className="node-title">{memberInfo.username}</View>
				</View>
			)}

			{topics.map((item) => {
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
							<View className="topics-item-title">{item.title}</View>
							<View className="topics-item-member">
								{/* <Image src={getProxyImage(item.member.avatar_mini)} mode="aspectFit" className="topics-item-member-avatar" lazyLoad /> */}
								<View>
									{/* <View className="topics-item-member-username">{item.member.username}</View> */}
									<View className="time">
										<Text>{getTimeFromNow(item.created * 1000)}</Text>
										<Text> · </Text>
										<Text>{`${item.replies}条回复`}</Text>
									</View>
								</View>
							</View>
						</View>
					</>
				);
			})}
		</>
	);
};

export default Index;
