/**
 * 图片反代加速
 * @param url 图片URL
 * @returns
 */
export function getProxyImage(url: string) {
	return 'https://images.weserv.nl/?url=' + url;
}
