import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useKey } from '../hooks/useKey';
import debounce from 'lodash.debounce';

interface SearchProps {
	query: string;
	onSetQuery: (query: string) => void;
}

const Search = ({ query, onSetQuery }: SearchProps) => {
	const [value, setValue] = useState(query);
	const inputEl = useRef<HTMLInputElement>(null);

	useKey('Enter', () => {
		if (document.activeElement === inputEl.current) {
			return;
		}

		inputEl.current?.focus();
		setValue('');
		onSetQuery('');
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setValue(value);
		handleDebounedQuery(value);
	};

	const handleDebounedQuery = useCallback(
		debounce((query: string) => {
			onSetQuery(query);
		}, 500),
		[]
	);

	return (
		<div className="search-field">
			<input
				ref={inputEl}
				className={`search${
					value.length > 0 && value.length < 3
						? ' search-invalid'
						: ''
				}`}
				type="text"
				placeholder="Search movies..."
				value={value}
				onChange={handleInputChange}
			/>
		</div>
	);
};

export default Search;
