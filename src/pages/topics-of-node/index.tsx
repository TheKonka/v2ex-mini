import React, { useRef, useState } from 'react';
import { View, Text, Image, RichText } from '@tarojs/components';
import Taro, { useLoad, useReachBottom, useRouter, useShareAppMessage } from '@tarojs/taro';
import { getProxyImage } from '@/helpers/img';
import { getTimeFromNow } from '@/helpers/time';
import { getNodeByName, getTopicsByNode } from '@/services/api';
import './index.scss';

const Index: React.FC = () => {
	const router = useRouter();
	const { node, node_title } = router.params;

	const [topics, setTopics] = useState<Api.TopicsOfNode[]>([]);
	const [nodeInfo, setNodeInfo] = useState<Api.NodeInfo>();
	const [pageCount, setPageCount] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);

	const isFetching = useRef(false);

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
				Taro.setNavigationBarTitle({
					title: res.result.title
				});
			});
			getTopicsByNode(node, 1).then((res) => {
				setTopics(res.result);
			});
		}
	});

	useShareAppMessage(() => {
		return {
			title: nodeInfo?.title || '节点主题',
			path: '/pages/topics-of-node/index'
		};
	});

	useReachBottom(() => {
		if (currentPage < pageCount && node && !isFetching.current) {
			isFetching.current = true;
			getTopicsByNode(node, currentPage).then((res) => {
				setTopics((p) => [...p, ...res.result]);
				setCurrentPage((p) => p + 1);
				isFetching.current = false;
			});
		}
	});

	return (
		<>
			{nodeInfo && (
				<View className="node">
					<Image
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

			{topics.length > 0 && currentPage >= pageCount ? (
				<View className="no-more">
					<Text>—— 没有更多主题了 ——</Text>
				</View>
			) : null}
		</>
	);
};

export default Index;
