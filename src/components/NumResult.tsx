import React from 'react';

interface NumResultProps {
	movies: Movie[];
}

const NumResult = ({ movies }: NumResultProps) => {
	return (
		<p className="num-results">
			Found <strong>{movies.length}</strong> results
		</p>
	);
};

export default NumResult;
