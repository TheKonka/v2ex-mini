import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from '@tarojs/components';
import Taro, { useLoad, useRouter, useShareAppMessage } from '@tarojs/taro';
import { getProxyImage } from '@/helpers/img';
import { getTimeFromNow } from '@/helpers/time';
import { getMemberByUsername, getTpoicsByUsername } from '@/services/api';
import './index.scss';
import NavigationBar from '@/components/Navigationbar';
import SafeArea from '@/components/SafeArea';
import Loading from '@/components/Loading';
import twitterImg from 'lucide-static/icons/twitter.svg';
import githubImg from 'lucide-static/icons/github.svg';
import locationImg from 'lucide-static/icons/map-pin.svg';
import linkImg from 'lucide-static/icons/link.svg';
import dayjs from 'dayjs';

const Index: React.FC = () => {
	const router = useRouter();
	const { username } = router.params;

	const [memberInfo, setMemberInfo] = useState<Api.Member>();
	const [topics, setTopics] = useState<Api.TodayHotTopics[]>([]);

	useLoad(() => {
		if (username) {
			Taro.setNavigationBarTitle({
				title: username
			});
			getMemberByUsername(username)
				.then((res) => {
					setMemberInfo(res);
				})
				.catch(() => {
					Taro.showModal({
						title: '获取会员信息失败',
						showCancel: false
					}).then(() => {
						Taro.navigateBack();
					});
				});
			getTpoicsByUsername(username)
				.then((res) => {
					setTopics(res);
				})
				.catch(() => {});
		}
	});

	useShareAppMessage(() => {
		return {
			title: username || '会员信息',
			path: `/pages/member/index?username=${username}`
		};
	});

	return (
		<>
			<NavigationBar title={username || '会员信息'} showBackIcon={true} />
			<ScrollView scrollY enableFlex enhanced scrollWithAnimation type="custom" className="scroll-view">
				{memberInfo ? (
					<View className="node">
						<View className="top">
							<View className="avatar">
								<Image
									showMenuByLongpress
									src={getProxyImage(memberInfo.avatar_xlarge || memberInfo.avatar_large)}
									mode="aspectFit"
									onClick={() => {
										Taro.previewImage({
											urls: [getProxyImage(memberInfo.avatar_xlarge || memberInfo.avatar_large)],
											showmenu: true
										});
									}}
								/>
							</View>

							<View className="top-right">
								<View className="username">{memberInfo.username}</View>
								<View className="info">
									V2EX 第 {memberInfo.id} 号会员，加入于 {dayjs.unix(memberInfo.created).format()}
								</View>
							</View>
						</View>

						{memberInfo.tagline && <View className="tagline">{memberInfo.tagline}</View>}

						<View className="widgets">
							{memberInfo.twitter && (
								<View
									onClick={() => {
										Taro.setClipboardData({
											data: 'https://x.com/' + memberInfo.twitter,
											success() {
												Taro.showToast({
													title: '链接已复制',
													icon: 'none'
												});
											}
										});
									}}
								>
									<Image src={twitterImg} mode="aspectFit" />
									<Text>{memberInfo.twitter}</Text>
								</View>
							)}
							{memberInfo.website && (
								<View
									onClick={() => {
										Taro.setClipboardData({
											data: memberInfo.website!,
											success() {
												Taro.showToast({
													title: '链接已复制',
													icon: 'none'
												});
											}
										});
									}}
								>
									<Image src={linkImg} mode="aspectFit" />
									<Text>{memberInfo.website}</Text>
								</View>
							)}
							{memberInfo.location && (
								<View>
									<Image src={locationImg} mode="aspectFit" />
									<Text>{memberInfo.location}</Text>
								</View>
							)}
							{memberInfo.github && (
								<View
									onClick={() => {
										Taro.setClipboardData({
											data: 'https://github.com/' + memberInfo.github,
											success() {
												Taro.showToast({
													title: '链接已复制',
													icon: 'none'
												});
											}
										});
									}}
								>
									<Image src={githubImg} mode="aspectFit" />
									<Text>{memberInfo.github}</Text>
								</View>
							)}
						</View>
					</View>
				) : (
					<Loading />
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
											<Text>{getTimeFromNow(item.created)}</Text>
											<Text> · </Text>
											<Text>{`${item.replies}条回复`}</Text>
										</View>
									</View>
								</View>
							</View>
						</>
					);
				})}

				<SafeArea />
			</ScrollView>
		</>
	);
};

export default Index;
