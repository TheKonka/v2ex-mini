/**
 * 获取目标时间与当前的相对时间
 * @param time
 */
export function getTimeFromNow(time: number) {
	const now = new Date();
	const target = new Date(time);
	const diff = now.getTime() - target.getTime();
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((diff % (1000 * 60)) / 1000);

	if (days === 0) {
		if (hours === 0) {
			if (minutes === 0) {
				return seconds + '秒前';
			} else {
				return minutes + '分钟' + '前';
			}
		} else {
			return hours + '小时' + minutes + '分钟' + '前';
		}
	} else {
		return days + '天' + hours + '小时' + '前';
	}
}
