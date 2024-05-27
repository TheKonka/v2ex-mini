import { PageContainer, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import React, { useEffect, useRef, useState } from 'react';
import RepliesItem from '../RepliesItem';
import './index.scss';
import SafeArea from '@/components/SafeArea';

interface Props {
	replies: Api.Replies[];
	opId: number;
}
const RepliesBySomeone: React.FC<Props> = ({ replies, opId }) => {
	const router = useRouter();
	const { id } = router.params;

	const [show, setShow] = useState(false);
	const [name, setName] = useState('');

	const repliesRef = useRef(replies);
	repliesRef.current = replies;

	useEffect(() => {
		Taro.eventCenter.on('replyBySomeone', (data) => {
			const { name, topic_id } = data;
			if (id === topic_id) {
				const hasPerson = repliesRef.current.some((item) => item.member.username === data.name);
				if (hasPerson) {
					setName(name);
					setShow(true);
				} else {
					Taro.navigateTo({
						url: `/pages/member/index?username=${name}`
					});
				}
			}
		});

		return () => {
			if (!Taro.getCurrentPages().some((item) => item.route === 'pages/topics-detail/index')) {
				Taro.eventCenter.off('replyBySomeone');
			}
		};
	}, [id]);

	return (
		<PageContainer show={show} onLeave={() => setShow(false)} round>
			<ScrollView className="scroll-view-page-container" scrollY enableFlex enhanced>
				{replies.map((item, index) => {
					if (item.member.username === name) {
						return <RepliesItem item={item} index={index} key={item.id} op={item.member.id === opId} />;
					}
				})}
				<SafeArea />
			</ScrollView>
		</PageContainer>
	);
};

export default RepliesBySomeone;
