import classNames from 'classnames';
import React, { useState } from 'react';
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import { useShareAppMessage } from '@tarojs/taro';
import TabsItem from './components/TabsItem';
import './index.scss';
import NavigationBar from '@/components/navigation-bar';
import Taro from '@tarojs/taro';

const Index: React.FC = () => {
	const [currentTab, setCurrentTab] = useState<string>(() => Taro.getStorageSync('home_tab') || 'tech');
	const [scrollIntoViewId, setScrollIntoViewId] = useState('');

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
			<NavigationBar title="V2EX" showBackIcon={false} />
			<ScrollView
				scrollX
				enhanced
				enableFlex
				className="tabs"
				scrollWithAnimation
				scrollIntoView={scrollIntoViewId}
				showScrollbar={false}
				type="list"
				style={{ display: 'flex' }}
			>
				{tabs.map((item, index) => {
					return (
						<View className="tabs-wrapper" key={item.id} id={'id' + index} style={{ display: 'flex', alignItems: 'center' }}>
							<View
								className={classNames('tabs-item', { active: currentTab === item.id })}
								onClick={() => {
									setCurrentTab(item.id);
									Taro.setStorage({
										key: 'home_tab',
										data: item.id
									});
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
				current={tabs.findIndex((i) => i.id === currentTab)}
				autoplay={false}
				cache-extent={1}
				cacheExtent={1}
				onChange={(e) => {
					if (e.detail.source === 'touch') {
						setScrollIntoViewId('id' + e.detail.current);
						setCurrentTab(tabs[e.detail.current].id);
					}
				}}
			>
				{tabs.map((i) => {
					return (
						<SwiperItem key={i.id} skipHiddenItemLayout>
							<TabsItem id={i.id} currentId={currentTab} />
						</SwiperItem>
					);
				})}
			</Swiper>
		</>
	);
};

export default Index;
