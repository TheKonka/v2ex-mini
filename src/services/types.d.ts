declare namespace Api {
	interface Node {
		avatar_large: string;
		name: string;
		avatar_normal: string;
		title: string;
		url: string;
		topics: number;
		footer: string;
		header: string;
		title_alternative: string;
		avatar_mini: string;
		stars: number;
		aliases: any[];
		root: boolean;
		id: number;
		parent_node_name: string;
	}
	interface Member {
		id: number;
		username: string;
		url: string;
		website?: string;
		twitter?: string;
		psn?: string;
		github?: string;
		btc?: string;
		location?: string;
		tagline?: string;
		bio?: string;
		avatar_mini: string;
		avatar_normal: string;
		avatar_large: string;
		created: number;
		last_modified: number;
		avatar_xlarge?: string;
		avatar_xxlarge?: string;
		avatar_xxxlarge?: string;
	}

	interface TodayHotTopics {
		node: Node;
		member: Member;
		last_reply_by: string;
		last_touched: number;
		title: string;
		url: string;
		created: number;
		deleted: number;
		content: string;
		content_rendered: string;
		last_modified: number;
		replies: number;
		id: number;
	}

	interface Replies {
		id: number;
		content: string;
		content_rendered: string;
		created: number;
		member: Pick<Member, 'id' | 'username' | 'bio' | 'website' | 'github' | 'url' | 'created'> & { avatar: string };
	}
	interface Supplement {
		id: number;
		content: string;
		content_rendered: string;
		syntax: number;
		created: number;
	}

	interface TopicsDetail {
		id: number;
		title: string;
		content: string;
		content_rendered: string;
		syntax: number;
		url: string;
		replies: number;
		last_reply_by: string;
		created: number;
		last_modified: number;
		last_touched: number;
		member: Pick<Member, 'id' | 'username' | 'bio' | 'website' | 'github' | 'url' | 'created'> & { avatar: string };
		node: Pick<Node, 'id' | 'url' | 'name' | 'title' | 'header' | 'footer' | 'topics'> & {
			avatar: string;
			created: number;
			last_modified: number;
		};
		supplements: Supplement[];
	}
}
