import React from 'react';

import debounce from 'lodash.debounce';

interface SearchProps {
	onSetQuery: (q: string) => void;
}

const Search = ({ onSetQuery }: SearchProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		console.log(value);

		onSetQuery(value);
	};

	const debouncedOnChange = debounce(handleChange, 500);

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			onChange={debouncedOnChange}
		/>
	);
};

export default Search;
