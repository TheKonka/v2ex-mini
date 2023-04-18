import classNames from 'classnames';
import React, { useState } from 'react';
import { View, Image, Text, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import Taro, { useLoad, useShareAppMessage } from '@tarojs/taro';
import TabsItem from './components/TabsItem';
import './index.scss';

const Index: React.FC = () => {
	const [currentTab, setCurrentTab] = useState(0);
	const [scrillIntoViewId, setScrillIntoViewId] = useState('');

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
			title: 'v2ex',
			path: '/pages/home/index'
		};
	});

	return (
		<>
			<ScrollView scrollX enhanced enableFlex className="tabs" scrollWithAnimation scrollIntoView={scrillIntoViewId}>
				{tabs.map((item, index) => {
					return (
						<View className="tabs-wrapper" key={item.id} id={'id' + index}>
							<View
								className={classNames('tabs-item', { active: currentTab === index })}
								onClick={() => {
									setCurrentTab(index);
								}}
							>
								<View>{item.name}</View>
							</View>
						</View>
					);
				})}
			</ScrollView>

			<Swiper
				className="tab-swpier"
				current={currentTab}
				autoplay={false}
				cache-extent={1}
				cacheExtent={1}
				onChange={(e) => {
					if (e.detail.source === 'touch') {
						setScrillIntoViewId('id' + e.detail.current);
						setCurrentTab(e.detail.current);
					}
				}}
			>
				{tabs.map((i) => {
					return (
						<SwiperItem key={i.id} skipHiddenItemLayout>
							<TabsItem id={i.id} currentId={tabs[currentTab].id} />
						</SwiperItem>
					);
				})}
			</Swiper>
		</>
	);
};

export default Index;
