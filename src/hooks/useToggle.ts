import { useCallback, useState } from 'react';

export default function useToggle(initialValue: boolean): [boolean, () => void] {
	const [value, setValue] = useState<boolean>(initialValue);

	const toggleValue = useCallback(() => setValue((p) => !p), []);

	return [value, toggleValue];
}
