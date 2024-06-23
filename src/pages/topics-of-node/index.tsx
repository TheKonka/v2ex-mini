import React, { useState } from 'react';
import { Image, RichText, ScrollView, Text, View } from '@tarojs/components';
import Taro, { useLoad, useRouter, useShareAppMessage } from '@tarojs/taro';
import { getProxyImage } from '@/helpers/img';
import { getTimeFromNow } from '@/helpers/time';
import { getNodeByName, getTopicsByNode } from '@/services/api';
import './index.scss';
import NavigationBar from '@/components/Navigationbar';
import useBoolean from '@/hooks/useBoolean';
import Loading from '@/components/Loading';

const Index: React.FC = () => {
	const router = useRouter();
	const { node, node_title } = router.params;

	const [topics, setTopics] = useState<Api.TopicsOfNode[]>([]);
	const [nodeInfo, setNodeInfo] = useState<Api.NodeInfo>();
	const [pageCount, setPageCount] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);

	const [isFetching, setIsFetching] = useBoolean(false);

	useLoad(() => {
		if (node_title) {
			Taro.setNavigationBarTitle({
				title: node_title
			});
		}
		if (node) {
			getNodeByName(node).then((res) => {
				setNodeInfo(res.result);
				setPageCount(Math.ceil(res.result.topics / 20));
				// Taro.setNavigationBarTitle({
				// 	title: res.result.title
				// });
			});
			getTopicsByNode(node, 1).then((res) => {
				setTopics(res.result);
			});
		}
	});

	useShareAppMessage(() => {
		return {
			title: nodeInfo?.title || '节点主题',
			path: `/pages/topics-of-node/index?node=${node}&node_title=${node_title}`
		};
	});

	return (
		<>
			<NavigationBar title={nodeInfo?.title || '节点主题'} showBackIcon={true} />
			<ScrollView
				scrollY
				enableFlex
				enhanced
				scrollWithAnimation
				type="custom"
				className="scroll-view"
				onScrollToLower={() => {
					if (currentPage < pageCount && node && !isFetching) {
						setIsFetching.setTrue();
						getTopicsByNode(node, currentPage).then((res) => {
							setTopics((p) => [...p, ...res.result]);
							setCurrentPage((p) => p + 1);
							setIsFetching.setFalse();
						});
					}
				}}
			>
				{nodeInfo && (
					<View className="node">
						<Image
							showMenuByLongpress
							src={getProxyImage(nodeInfo.avatar)}
							mode="aspectFit"
							className="node-avatar"
							onClick={() => {
								Taro.previewImage({
									urls: [getProxyImage(nodeInfo.avatar)],
									showmenu: true
								});
							}}
						/>
						<View className="node-title">{nodeInfo.title}</View>
						<View className="node-header">
							<RichText nodes={nodeInfo.header} userSelect />
						</View>
						<View className="node-topics">主题总数 {nodeInfo.topics}</View>
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
				{isFetching && <Loading />}
				{topics.length > 0 && currentPage >= pageCount ? (
					<View className="no-more" style={{ textAlign: 'center' }}>
						<Text>—— 没有更多主题了 ——</Text>
					</View>
				) : null}
			</ScrollView>
		</>
	);
};

export default Index;
