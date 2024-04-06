import React, { useEffect, useState } from 'react';
import { View, Input, Text, RichText, ScrollView } from '@tarojs/components';
import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro';
import './index.scss';
import { sov2ex } from '@/services/api';
import dayjs from 'dayjs';
import useBoolean from '@/hooks/useBoolean';
import Loading from '@/components/loading';

const Index: React.FC = () => {
	const router = useRouter();
	const { query } = router.params;

	const [inputValue, setInputValue] = useState<string>(query || '');
	const [searchResult, setSearchResult] = useState<SOV2EX.Hit[]>([]);
	const [isFetching, setIsFetching] = useBoolean(false);
	const [pageIndex, setPageIndex] = useState(0);
	const [total, setTotal] = useState(0);

	useShareAppMessage(() => {
		return {
			title: inputValue,
			path: `/pages/my/search/index?query=${inputValue}`
		};
	});

	useEffect(() => {
		let ignore = false;
		if (inputValue) {
			setIsFetching.setTrue();
			setSearchResult([]);
			sov2ex({
				q: inputValue,
				from: 0,
				size: 10
			}).then((res) => {
				if (!ignore) {
					setPageIndex(0);
					setTotal(res.total);
					setSearchResult(res.hits);
					setIsFetching.setFalse();
				}
			});
		}
		return () => {
			ignore = true;
		};
	}, [inputValue]);

	const reachEnd = (pageIndex + 1) * 10 >= total;

	return (
		<>
			<View className="search">
				<Input
					focus
					value={inputValue}
					placeholder="搜索"
					onInput={(e) => {
						setInputValue(e.detail.value);
					}}
				/>
				<View></View>
			</View>
			{/*
			<View>
				<View>排序方式</View>
				<View>默认</View>
				<View>发帖时间降序</View>
				<View>发帖时间升序</View>
			</View> */}

			<ScrollView
				className="search-result"
				scrollY
				enableFlex
				enhanced
				scrollWithAnimation
				type="custom"
				onScrollToLower={() => {
					if (!reachEnd && !isFetching) {
						setIsFetching.setTrue();
						sov2ex({
							q: inputValue,
							from: (pageIndex + 1) * 10,
							size: 10
						}).then((res) => {
							setPageIndex((p) => p + 1);
							setTotal(res.total);
							setSearchResult((p) => [...p, ...res.hits]);
							setIsFetching.setFalse();
						});
					}
				}}
			>
				{searchResult.map((item) => {
					return (
						<View
							key={item._source.id}
							className="search-result-item"
							onClick={() => {
								Taro.navigateTo({
									url: `/pages/topics-detail/index?id=${item._source.id}`
								});
							}}
						>
							<View className="search-result-item-title">{item._source.title}</View>
							<RichText
								className="search-result-item-content"
								nodes={item.highlight.content?.[0] || item.highlight['reply_list.content']?.[0]}
							></RichText>
							<View className="search-result-item-meta">
								<Text>{item._source.member}</Text>
								<Text> 于 </Text>
								<Text>{dayjs(item._source.created).format('YYYY-MM-DD HH:mm:ss')}</Text>
								<Text> 发表，共计 </Text>
								<Text>{item._source.replies} </Text>
								<Text>个回复</Text>
							</View>
						</View>
					);
				})}

				{isFetching && <Loading />}

				{searchResult.length > 0 && reachEnd ? (
					<View className="no-more" style={{ textAlign: 'center' }}>
						<Text>—— 我是有底线的 ——</Text>
					</View>
				) : null}
			</ScrollView>
		</>
	);
};

export default Index;
