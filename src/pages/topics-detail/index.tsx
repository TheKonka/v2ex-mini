import React, { useRef, useState } from 'react';
import { View, Image, Text } from '@tarojs/components';
import Taro, { useLoad, useReachBottom, useRouter, useShareAppMessage } from '@tarojs/taro';
import Loading from '@/components/loading';
import MarkDown from '@/components/markdown';
import { getProxyImage } from '@/helpers/img';
import { getTimeFromNow } from '@/helpers/time';
import { getTpoicsById, getTpoicsRepliesById } from '@/services/api';
import './index.scss';

const Index: React.FC = () => {
	const router = useRouter();
	const { id } = router.params;

	const [topics, setTopics] = useState<Api.TopicsDetail>();
	const [pageCount, setPageCount] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [replies, setReplies] = useState<Api.Replies[]>([]);

	const isFetching = useRef(false);

	useLoad(() => {
		if (id) {
			getTpoicsById(id).then((res) => {
				setTopics(res.result);
				setPageCount(Math.ceil(res.result.replies / 20));
				Taro.setNavigationBarTitle({
					title: 't/' + res.result.id
				});
			});

			getTpoicsRepliesById(id, 1).then((res) => {
				setReplies(res.result);
			});
		}
	});

	useShareAppMessage(() => {
		return {
			title: topics?.title || '主题详情',
			path: `/pages/topics-detail/index?id=${id}`
		};
	});

	useReachBottom(() => {
		if (currentPage < pageCount && id && !isFetching.current) {
			isFetching.current = true;
			getTpoicsRepliesById(id, currentPage + 1).then((res) => {
				setReplies((p) => [...p, ...res.result]);
				setCurrentPage((p) => p + 1);
				isFetching.current = false;
			});
		}
	});

	return (
		<>
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
										url: `/pages/topics-of-node/index?node=${topics.node.name}`
									});
								}}
							>
								{topics.node.title}
							</View>
						</View>
						<MarkDown nodes={topics.content_rendered} />

						{topics.supplements.map((item, index) => {
							return (
								<>
									<View className="supplements">
										<View className="supplements-index">{`第${index + 1}条附言`}</View>
										<View className="time">{getTimeFromNow(item.created * 1000)}</View>
									</View>

									<MarkDown nodes={item.content_rendered} />
								</>
							);
						})}
					</View>

					{replies.map((item, index) => {
						return (
							<View key={item.id} className="replies-item">
								<View className="author">
									<Text>#{index + 1}</Text>
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
										<View className="time">{getTimeFromNow(item.created * 1000)}</View>
									</View>
								</View>

								<MarkDown nodes={item.content_rendered} className={item.member.id === topics.member.id ? '' : 'bg-main'} />
							</View>
						);
					})}

					{replies.length > 0 && currentPage >= pageCount ? (
						<View className="no-more">
							<Text>—— 没有更多回复了 ——</Text>
						</View>
					) : null}
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default Index;
