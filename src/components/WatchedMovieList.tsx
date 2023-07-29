import React from 'react';

import WatchedMovie from './WatchedMovie';

interface WatchedMovieListProps {
	watched: WatchedMovie[];
}

const WatchedMovieList = ({ watched }: WatchedMovieListProps) => {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedMovie key={movie.imdbID} movie={movie} />
			))}
		</ul>
	);
};

export default WatchedMovieList;
