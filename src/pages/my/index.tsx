import React, { useRef, useState } from 'react';
import { View, Input, Button, Image, Text, PageContainer, ShareElement } from '@tarojs/components';
import Taro, { useDidShow, useShareAppMessage } from '@tarojs/taro';
import githubImg from '@/assets/github-mark.png';
import historyIcon from 'lucide-static/icons/history.svg';
import xIcon from 'lucide-static/icons/x.svg';
import arrowIcon from 'lucide-static/icons/arrow-up-left.svg';
import './index.scss';

const Index: React.FC = () => {
	const [topicId, setTopicId] = useState<string>();
	const [memberName, setMemberName] = useState<string>();
	const [inputValue, setInputValue] = useState<string>();
	const [show, setShow] = useState(false);
	const [searchHistory, setSearchHistory] = useState<string[]>([]);

	const { current: menuButtonBoundingClient } = useRef<Taro.getMenuButtonBoundingClientRect.Rect>(Taro.getMenuButtonBoundingClientRect());

	useShareAppMessage(() => {
		return {
			title: 'v2ex',
			path: '/pages/my/index'
		};
	});

	useDidShow(() => {
		Taro.getStorage({ key: 'search_history' })
			.then((res) => {
				setSearchHistory(res.data);
			})
			.catch(() => {
				setSearchHistory([]);
			});

		console.log(Taro.getCurrentPages(), Taro.getCurrentInstance());
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

	const goSearch = (q: string) => {
		Taro.navigateTo({
			url: `/pages/my/search/index?query=${q}`
		});

		Taro.setStorage({
			key: 'search_history',
			data: Array.from(new Set([q, ...searchHistory]))
		});
	};

	const handleSearch = () => {
		if (inputValue) {
			goSearch(inputValue);
		} else {
			Taro.showToast({
				title: '请输入查询的关键字',
				icon: 'none'
			});
		}
	};

	return (
		<>
			<ShareElement mapkey={'search_box'} transform duration={300}>
				<View
					style={{ height: menuButtonBoundingClient.height + 10, top: menuButtonBoundingClient.top - 5, position: 'fixed', left: 20 }}
					className="search"
					onClick={() => {
						setShow(true);
					}}
				>
					<View></View>
					<Text>搜索</Text>
				</View>
			</ShareElement>

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

			<PageContainer show={show} onLeave={() => setShow(false)} position="center">
				<Image
					src={xIcon}
					mode="aspectFit"
					className="close"
					onClick={() => setShow(false)}
					style={{
						top: menuButtonBoundingClient.top,
						height: menuButtonBoundingClient.height
					}}
				/>
				<View className="search-wrapper">
					<Input
						focus={show}
						placeholder="请输入查询的关键字"
						onInput={(e) => {
							setInputValue(e.detail.value);
						}}
						onConfirm={handleSearch}
					/>
					<ShareElement mapkey={'search_box'} transform duration={300}>
						<View className="search" style={{ height: menuButtonBoundingClient.height + 10 }} onClick={handleSearch}>
							<View></View>
							<Text>搜索</Text>
						</View>
					</ShareElement>
				</View>

				<View className="search-history">
					{searchHistory.slice(0, 20).map((item) => {
						return (
							<View
								className="search-history-item"
								key={item}
								onClick={() => {
									goSearch(item);
								}}
							>
								<Image src={historyIcon} mode="aspectFit" />
								<Text>{item}</Text>
								<Image src={arrowIcon} mode="aspectFit" className="arrow" />
							</View>
						);
					})}
				</View>
			</PageContainer>
		</>
	);
};

export default Index;
