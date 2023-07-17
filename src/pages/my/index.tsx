import React, { useState } from 'react';
import { View, Input, Button, Image, Text } from '@tarojs/components';
import Taro, { useShareAppMessage } from '@tarojs/taro';
import githubImg from '@/assets/github-mark.png';
import './index.scss';

const Index: React.FC = () => {
	const [topicId, setTopicId] = useState<string>();
	const [memberName, setMemberName] = useState<string>();

	useShareAppMessage(() => {
		return {
			title: 'v2ex',
			path: '/pages/my/index'
		};
	});

	const handleTopic = () => {
		if (!topicId) {
			Taro.showToast({
				title: '请输入主题ID',
				icon: 'none'
			});
			return;
		}
		Taro.navigateTo({
			url: `/pages/topics-detail/index?id=${topicId}`
		});
	};

	const handleMember = () => {
		if (!memberName) {
			Taro.showToast({
				title: '请输入会员名',
				icon: 'none'
			});
			return;
		}
		Taro.navigateTo({
			url: `/pages/member/index?username=${memberName}`
		});
	};

	return (
		<>
			<View className="to">
				<View className="to-t">t/</View>
				<Input placeholder="主题id" maxlength={7} type="number" onInput={(e) => setTopicId(e.detail.value)} />
				<Button className="to-btn" size="mini" onClick={handleTopic}>
					直达主题
				</Button>
			</View>

			<View className="to member">
				<View className="to-t">m/</View>
				<Input placeholder="会员名" onInput={(e) => setMemberName(e.detail.value)} />
				<Button className="to-btn" size="mini" onClick={handleMember}>
					直达会员
				</Button>
			</View>

			<View
				className="to github"
				onClick={() => {
					Taro.setClipboardData({
						data: 'https://github.com/TheKonka/v2ex-mini',
						success: () => {
							Taro.showToast({
								title: '地址已复制',
								icon: 'none'
							});
						}
					});
				}}
			>
				<Image src={githubImg} mode="aspectFit" />
				<Text>Find Me On GitHub🌟</Text>
			</View>
		</>
	);
};

export default Index;
