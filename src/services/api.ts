import RequestManager from './requestManager';

/**
 * 获取指定节点
 * @param node_name
 * @returns
 */
export function getNodeByName(node_name: string) {
	return RequestManager.get(`api/v2/nodes/${node_name}`);
}

/**
 * 获取指定节点下的主题
 * @param node_name
 * @param p  - 分页页码，默认为 1
 * @returns
 */
export function getTopicsByNode(node_name: string, p = 1) {
	return RequestManager.get(`api/v2/nodes/${node_name}/topics?p=${p}`);
}

/**
 * 获取指定主题
 */
export function getTpoicsById(topic_id: string) {
	return RequestManager.get(`api/v2/topics/${topic_id}`);
}

/**
 * 获取指定主题下的回复
 * @param topic_id
 * @param p  - 分页页码，默认为 1
 */
export function getTpoicsRepliesById(topic_id: string, p = 1) {
	return RequestManager.get(`api/v2/topics/${topic_id}/replies?p=${p}`);
}

/**
 * 最热主题
 * 相当于首页右侧的 大约每天10条的内容
 */
export function getTodayHotTopics() {
	return RequestManager.get(`api/topics/hot.json`);
}

/**
 * https://www.v2ex.com/planes
 */
export function getPlanes() {
	return RequestManager.get(`planes`);
}

/**
 * 节点list
 */
export function getNodesList() {
	return RequestManager.get(`api/nodes/list.json?fields=name,title,topics,avatar_normal&sort_by=topics&reverse=1`);
}

/**
 * 根据username获取主题
 */
export function getTpoicsByUsername(username: string) {
	return RequestManager.get(`api/topics/show.json?username=${username}`);
}

/**
 * 根据username获取用户信息
 */
export function getMemberByUsername(username: string) {
	return RequestManager.get(`api/members/show.json?username=${username}`);
}
