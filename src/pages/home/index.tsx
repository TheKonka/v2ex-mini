import React, { useState } from 'react';
import { View, Image, Text, Swiper, SwiperItem } from '@tarojs/components';
import Taro, { useLoad, useShareAppMessage } from '@tarojs/taro';
import TabsItem from './components/TabsItem';
import './index.scss';

const Index: React.FC = () => {
	const [currentTab, setCurrentTab] = useState(0);

	const tabs = [
		{ name: '技术', id: 'tech' },
		{ name: '创意', id: 'creative' },
		{ name: '好玩', id: 'play' },
		{ name: 'Apple', id: 'apple' },
		{ name: '酷工作', id: 'jobs' },
		{ name: '交易', id: 'deals' },
		{ name: '城市', id: 'city' },
		{ name: '问与答', id: 'qna' },
		{ name: '最热', id: 'hot' },
		{ name: '全部', id: 'all' },
		{ name: 'R2', id: 'r2' }
	];

	useShareAppMessage(() => {
		return {
			title: '今日热议主题',
			path: '/pages/home/index'
		};
	});

	return (
		<>
			<Swiper
				current={currentTab}
				autoplay={false}
				onChange={(e) => {
					if (e.detail.source === 'touch') {
						setCurrentTab(e.detail.current);
					}
				}}
			>
				{tabs.slice(Math.max(currentTab - 2, 0), currentTab + 2).map((i) => {
					return (
						<SwiperItem key={i.id}>
							<TabsItem id={i.id} />
						</SwiperItem>
					);
				})}
			</Swiper>
		</>
	);
};

export default Index;
