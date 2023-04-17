import React, { useEffect } from 'react';
import { CustomWrapper, View } from '@tarojs/components';
import { getTechTab } from '@/services/api';
import TopicItem from '../TopicsItem';

interface Props {
	id: string;
}
const TabsItem: React.FC<Props> = ({ id }) => {
	const [topicList, setTopicList] = React.useState<TabTopic[]>([]);

	useEffect(() => {
		getTechTab(id).then((res) => {
			const t = res.replace(/\n/g, '').match(/<table cellpadding="0" cellspacing="0" border="0" width="100%">(.*?)<\/table>/g);
			const r = t.map((i: any) => {
				const node = i.match(/<a class="node" href="\/go\/(\w+)">(.+?)<\/a>/);
				const topic = i.match(/<a href="\/t\/(\d+).*?" class="topic-link">(.+?)<\/a>/);
				return {
					username: i.match(/<a href="\/member\/(\w+)">/)[1],
					avatar: i.match(/<img src="([^"]*)"/)[1],
					node_name: node[2],
					node_id: node[1],
					title: topic[2],
					topic_id: topic[1],
					update_time: i.match(/<span class="small fade">([\d\u4e00-\u9fa5]+?[^&]+).*<\/span>/)[1],
					replay_num: i.match(/class="count_livid">(\d+)<\/a>/)?.[1] || 0
				};
			});
			console.log(55, r);

			setTopicList(r);
		});
	}, [id]);

	return (
		<CustomWrapper>
			{topicList.map((i) => {
				return <TopicItem key={i.topic_id} {...i} />;
			})}
		</CustomWrapper>
	);
};

export default TabsItem;
