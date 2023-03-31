import { useCallback, useMemo, useState } from 'react';

type UseBooleanActions = {
	toggle: () => void;
	setTrue: () => void;
	setFalse: () => void;
};

export default function useBoolean(initialValue: boolean): [boolean, UseBooleanActions] {
	const [value, setValue] = useState<boolean>(initialValue);

	const toggle = useCallback(() => setValue((p) => !p), []);
	const setTrue = useCallback(() => setValue(true), []);
	const setFalse = useCallback(() => setValue(false), []);
	const actions = useMemo(
		() => ({
			toggle,
			setTrue,
			setFalse
		}),
		[setFalse, setTrue, toggle]
	);

	return [value, actions];
}
