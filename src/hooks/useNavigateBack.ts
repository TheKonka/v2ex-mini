import Taro from '@tarojs/taro';
import useSetTimeout from './useSetTimeout';

export default function useDelayNavigateBack(time = 1500) {
	const nb = useSetTimeout(() => {
		Taro.navigateBack({ delta: 1 });
	}, time);

	return nb;
}
