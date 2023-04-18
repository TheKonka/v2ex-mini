import React, { useState } from 'react';
import { View, Image, Input, ScrollView, Button } from '@tarojs/components';
import Taro, { useLoad, useShareAppMessage } from '@tarojs/taro';
import searchImg from '@/assets/search.png';
import Loading from '@/components/loading';
import { getProxyImage } from '@/helpers/img';
import { getNodesList, getPlanes } from '@/services/api';
import './index.scss';

interface INode {
	name: string;
	title: string;
}

interface IPlanes {
	name: string;
	name_en: string;
	nodes_count: string;
	nodes: INode[];
}

type NodeList = Pick<Api.Node, 'avatar_normal' | 'name' | 'title'>;

const Index: React.FC = () => {
	const [planes, setPlanes] = useState<IPlanes[]>(() => Taro.getStorageSync('planes') || []);
	const [nodeList, setNodeList] = useState<NodeList[]>(() => Taro.getStorageSync('nodes_list') || []);
	const [searchResult, setSearchResult] = useState<NodeList[]>([]);
	const [searchValue, setSearchValue] = useState<string>('');
	const [scrollIntoViewId, setScrollIntoViewId] = useState<string>('tab0');

	useLoad(() => {
		getPlanes().then((res) => {
			// res.match(/(?<=<div class="header">).+?(?=<)/g)
			const categoryArr = res
				.match(/<div class="header">.*<\/div>/g)
				.map((i: string) => i.match(/<div[^>]+>([\s\S]+)<span[^>]+>([\s\S]+)<span[^>]+>([\s\S]+)<\/span><\/div>/))
				.filter(Boolean)
				.map((i: any) => {
					return {
						name: i[1],
						name_en: i[2].substring(0, i[2].length - 2).trim(),
						nodes_count: i[3],
						nodes: []
					};
				});

			for (let i = 0; i < categoryArr.length; i++) {
				const re = new RegExp(`${categoryArr[i].name}([\\s\\S]*?)${i === categoryArr.length - 1 ? '</html>' : categoryArr[i + 1].name}`);
				const nodesArea = res.match(re)[1];
				const regex = /<a\s+href="\/go\/([^"]*)"\s+class="item_node">([^<]*)<\/a>/g;
				let match;
				while ((match = regex.exec(nodesArea))) {
					categoryArr[i].nodes.push({
						name: match[1],
						title: match[2]
					});
				}
			}
			setPlanes(categoryArr);
			Taro.setStorage({
				key: 'planes',
				data: categoryArr
			});
		});

		getNodesList().then((res) => {
			setNodeList(res);
			Taro.setStorage({
				key: 'nodes_list',
				data: res
			});
		});
	});

	useShareAppMessage(() => {
		return {
			title: 'V2EX 位面列表',
			path: '/pages/planes/index'
		};
	});

	const handleNodeDetail = (node_name: string) => {
		Taro.navigateTo({
			url: `/pages/topics-of-node/index?node=${node_name}`
		});
	};

	const currentPlanes = planes[+(scrollIntoViewId.match(/tab(.)/)?.[1] || 0)];

	return (
		<>
			<View className="search">
				<View className="search-input">
					<Image src={searchImg} mode="aspectFit" className="search-img" />
					<Input
						placeholder="搜索节点"
						onInput={(e) => {
							const value = e.detail.value;
							setSearchValue(value);
							setSearchResult(nodeList.filter((i) => i.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())));
						}}
					/>
				</View>

				<ScrollView scrollX enhanced enableFlex className="search-hot" scrollWithAnimation>
					<>
						{(searchValue ? searchResult : nodeList.slice(0, 10)).map((item) => {
							return (
								<View className="search-hot-item-wrapper" key={item.name}>
									<View
										className="search-hot-item"
										onClick={() => {
											handleNodeDetail(item.name);
										}}
									>
										<Image src={getProxyImage(item.avatar_normal)} mode="aspectFit" className="search-hot-item-img" lazyLoad />
										<View>{item.title}</View>
									</View>
								</View>
							);
						})}
					</>
				</ScrollView>
			</View>

			<ScrollView scrollX enhanced enableFlex className="planes-tab" scrollIntoView={scrollIntoViewId} scrollWithAnimation>
				{planes.map((item, index) => {
					return (
						<View key={item.name} className="planes-tab-item-wrapper" id={'tab' + index}>
							<View
								className="planes-tab-item"
								onClick={() => {
									setScrollIntoViewId('tab' + index);
								}}
							>
								<View>{(scrollIntoViewId === 'tab' + index ? '• ' : '') + item.name}</View>
								<View>{item.name_en}</View>
								<View>{item.nodes_count}</View>
							</View>
						</View>
					);
				})}
			</ScrollView>

			<ScrollView scrollY enableFlex enhanced className="nodes" scrollWithAnimation>
				{currentPlanes ? (
					currentPlanes.nodes.map((item) => {
						return (
							<Button
								size="mini"
								className="nodes-item"
								key={item.name}
								onClick={() => {
									handleNodeDetail(item.name);
								}}
							>
								<View>{item.title}</View>
							</Button>
						);
					})
				) : (
					<Loading />
				)}
			</ScrollView>
		</>
	);
};

export default Index;
