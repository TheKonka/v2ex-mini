import { useEffect, useRef } from 'react';

export default function useSetTimeout(fn: () => void, timeout = 1500) {
	const timer = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		return () => {
			timer.current && clearTimeout(timer.current);
		};
	}, []);

	return () => {
		timer.current = setTimeout(fn, timeout);
	};
}
