import React, { useEffect } from 'react';
import { ScrollView, Text, View } from '@tarojs/components';
import Loading from '@/components/Loading';
import { getHomeTab } from '@/services/api';
import TopicItem from '../TopicsItem';
import './index.scss';
import Taro from '@tarojs/taro';

interface Props {
	id: string;
	currentId: string;
}

const TabsItem: React.FC<Props> = ({ id, currentId }) => {
	const [topicList, setTopicList] = React.useState<TabTopic[]>([]);
	const [show, setShow] = React.useState(false);

	useEffect(() => {
		if (id === currentId) {
			setShow(true);
		}
	}, [id, currentId]);

	useEffect(() => {
		if (show) {
			const list: Map<string, TabTopic[]> = new Map(Taro.getStorageSync('home_tab_list'));
			setTopicList(list.get(id) || []);
			getHomeTab(id).then((res) => {
				const t = res
					.replace(/\n/g, '')
					.match(/<table cellpadding="0" cellspacing="0" border="0" width="100%">(?:((?!<\/table).)*?(?:class="node").*?)<\/table>/g);
				const r = t.map((i: any) => {
					const node = i.match(/<a class="node" href="\/go\/(\w+)">(.+?)<\/a>/);
					const topic = i.match(/<a href="\/t\/(\d+).*?" class="topic-link".*?>(.+?)<\/a>/);
					return {
						username: i.match(/<a href="\/member\/(\w+)">/)[1],
						avatar: i.match(/<img src="([^"]*)"/)[1],
						node_name: node[2],
						node_id: node[1],
						title: topic[2],
						topic_id: topic[1],
						update_time: i.match(/<span (?:[^>]*)>([\d\u4e00-\u9fa5]+?[^&<]+).*<\/span>/)[1],
						replay_num: i.match(/class="count_livid">(\d+)<\/a>/)?.[1] || 0
					};
				});
				setTopicList(r);
				list.set(id, r);
				Taro.setStorage({
					key: 'home_tab_list',
					data: [...list]
				});
			});
		}
	}, [id, show]);

	return (
		<>
			{show && topicList.length > 0 ? (
				<ScrollView scrollY enableFlex enhanced scrollWithAnimation type="list" className="scrollview-tab">
					{topicList.map((i) => {
						return <TopicItem key={i.topic_id} {...i} />;
					})}
					<View className="no-more" style={{ textAlign: 'center' }}>
						<Text>—— 我是有底线的 ——</Text>
					</View>
				</ScrollView>
			) : (
				<Loading />
			)}
		</>
	);
};

export default TabsItem;
