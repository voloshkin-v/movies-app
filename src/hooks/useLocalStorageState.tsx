import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export const useLocalStorageState = (
	initialState: WatchedMovie[],
	key: string
): [WatchedMovie[], Dispatch<SetStateAction<WatchedMovie[]>>] => {
	const [value, setValue] = useState<WatchedMovie[]>(() => {
		const storedValue = localStorage.getItem(key);

		return JSON.parse(storedValue!) || initialState;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
};
