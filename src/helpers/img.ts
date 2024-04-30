/**
 * 图片反代加速
 * @param url 图片URL
 * @returns
 */
export function getProxyImage(url: string) {
	if (
		url.startsWith('https://img.199881.xyz/') ||
		url.startsWith('https://i.328888.xyz/') ||
		url.startsWith('https://i.niupic.com/') ||
		url.includes('.myqcloud.com') ||
		url.includes('duelpeak.com')
	) {
		return url;
	}
	if (url.startsWith('https://imgur.com/')) {
		url = url.replace('https://imgur.com/', 'https://i.imgur.com/');
	}

	return 'https://images.weserv.nl/?url=' + url;
}
