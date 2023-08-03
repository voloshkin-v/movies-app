import { useEffect } from 'react';

export const useKey = (keyCode: string, action: () => void) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code.toLowerCase() !== keyCode.toLowerCase()) {
				return;
			}

			action();
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [keyCode, action]);
};
