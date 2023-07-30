import React, { useCallback, useState } from 'react';

import debounce from 'lodash.debounce';

interface SearchProps {
	query: string;
	onSetQuery: (query: string) => void;
}

const Search = ({ query, onSetQuery }: SearchProps) => {
	const [value, setValue] = useState(query);
	const length = value.length;

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
				className={`search${
					length > 0 && length < 3 ? ' search-invalid' : ''
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
