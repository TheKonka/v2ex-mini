import { useCallback } from 'react';
import Taro from '@tarojs/taro';
import useSetTimeout from './useSetTimeout';

export default function useToast(options: Taro.showToast.Option, cb: () => void) {
	const timeout = options.duration ?? 1500;
	const fn = useSetTimeout(cb, timeout);

	const show = useCallback(() => {
		Taro.showToast({ ...options, duration: timeout });
		fn();
	}, [fn, options, timeout]);

	return { show };
}
