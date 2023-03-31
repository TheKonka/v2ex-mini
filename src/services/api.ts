import RequestManager from './requestManager';

/**
 * 获取指定节点下的主题
 * @param node_name
 * @param p  - 分页页码，默认为 1
 * @returns
 */
export function getTpoicsByNode(node_name: string, p = 1) {
	return RequestManager.get(`v2/nodes/${node_name}/topics?p=${p}`);
}
/**
 * 最热主题
 * 相当于首页右侧的 大约每天10条的内容
 */
export function getTodayHotTopics() {
	return RequestManager.get(`topics/hot.json`);
}

/**
 * 获取指定主题
 */
export function getTpoicsById(topic_id: string) {
	return RequestManager.get(`v2/topics/${topic_id}`);
}

/**
 * 获取指定主题下的回复
 * @param topic_id
 * @param p  - 分页页码，默认为 1
 */
export function getTpoicsRepliesById(topic_id: string, p = 1) {
	return RequestManager.get(`v2/topics/${topic_id}/replies?p=${p}`);
}
