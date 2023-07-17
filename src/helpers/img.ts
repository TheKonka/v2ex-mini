/**
 * 图片反代加速
 * @param url 图片URL
 * @returns
 */
export function getProxyImage(url: string) {
	if (url.startsWith('https://imgur.com/')) {
		url = url.replace('https://imgur.com/', 'https://i.imgur.com/');
	}
	if (url.startsWith('https://i.imgur.com/')) {
		return 'https://images.weserv.nl/?url=' + 'https://search.pstatic.net/common?src=' + url;
	}
	if (url.startsWith('https://i.328888.xyz/')) {
		return url;
	}

	return 'https://images.weserv.nl/?url=' + url;
}
