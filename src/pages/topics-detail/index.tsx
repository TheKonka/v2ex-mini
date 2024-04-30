import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from '@tarojs/components';
import Taro, { useLoad, useRouter, useShareAppMessage } from '@tarojs/taro';
import Loading from '@/components/loading';
import MarkDown from '@/components/markdown';
import { getProxyImage } from '@/helpers/img';
import { getTimeFromNow } from '@/helpers/time';
import { getTpoicsById, getTpoicsRepliesById } from '@/services/api';
import './index.scss';
import useBoolean from '@/hooks/useBoolean';
import RepliesBySomeone from './components/RepliesBySomeone';
import RepliesItem from './components/RepliesItem';
import { safeNavigateBack } from '@/helpers/route';

const Index: React.FC = () => {
	const router = useRouter();
	const { id } = router.params;

	const [topics, setTopics] = useState<Api.TopicsDetail>();
	const [pageCount, setPageCount] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [replies, setReplies] = useState<Api.Replies[]>([]);
	const [isFetching, setIsFetching] = useBoolean(false);

	useLoad(() => {
		if (id) {
			Taro.setNavigationBarTitle({
				title: 't/' + id
			});
			getTpoicsById(id)
				.then((res) => {
					setTopics(res.result);
					setPageCount(Math.ceil(res.result.replies / 20));
				})
				.catch(() => {
					Taro.showModal({
						content: '获取主题详情失败',
						showCancel: false
					}).then(() => {
						safeNavigateBack();
					});
				});

			getTpoicsRepliesById(id, 1)
				.then((res) => {
					setReplies(res.result);
				})
				.catch(() => {});
		}
	});

	useShareAppMessage(() => {
		return {
			title: topics?.title || '主题详情',
			path: `/pages/topics-detail/index?id=${id}`
		};
	});

	return (
		<>
			{/* <NavigationBar title={'t/' + id} showBackIcon={true} /> */}
			<ScrollView
				scrollY
				enableFlex
				enhanced
				scrollWithAnimation
				type="custom"
				className="scroll-view"
				onScrollToLower={() => {
					if (currentPage < pageCount && id && !isFetching) {
						setIsFetching.setTrue();
						getTpoicsRepliesById(id, currentPage + 1).then((res) => {
							setReplies((p) => [...p, ...res.result]);
							setCurrentPage((p) => p + 1);
							setIsFetching.setFalse();
						});
					}
				}}
			>
				{topics ? (
					<>
						<View className="top">
							<View className="title">{topics.title}</View>
							<View className="author">
								<Image
									src={getProxyImage(topics.member.avatar)}
									className="avatar"
									mode="aspectFit"
									onClick={(e) => {
										e.stopPropagation();
										Taro.navigateTo({
											url: `/pages/member/index?username=${topics.member.username}`
										});
									}}
								/>
								<View>
									<View className="author-username">{topics.member.username}</View>
									<View className="time">
										<Text>{getTimeFromNow(topics.created * 1000)}</Text>
										<Text> · </Text>
										<Text>{`${topics.replies}条回复`}</Text>
									</View>
								</View>
								<View
									className="node"
									onClick={() => {
										Taro.navigateTo({
											url: `/pages/topics-of-node/index?node=${topics.node.name}&node_name=${topics.node.title}`
										});
									}}
								>
									{topics.node.title}
								</View>
							</View>
							<MarkDown nodes={topics.content} />

							{topics.supplements.map((item, index) => {
								return (
									<>
										<View className="supplements">
											<View className="supplements-index">{`第${index + 1}条附言`}</View>
											<View className="time">{getTimeFromNow(item.created * 1000)}</View>
										</View>

										<MarkDown nodes={item.content} />
									</>
								);
							})}
						</View>

						{replies.map((item, index) => {
							return <RepliesItem item={item} index={index} key={item.id} op={item.member.id === topics.member.id} />;
						})}

						{isFetching && <Loading />}

						{replies.length > 0 && currentPage >= pageCount ? (
							<View className="no-more" style={{ textAlign: 'center' }}>
								<Text>—— 没有更多回复了 ——</Text>
							</View>
						) : null}
					</>
				) : (
					<Loading />
				)}
			</ScrollView>

			{topics && <RepliesBySomeone replies={replies} opId={topics.member.id} />}
		</>
	);
};

export default Index;
