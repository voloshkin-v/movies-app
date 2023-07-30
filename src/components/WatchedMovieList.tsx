import React from 'react';

import WatchedMovie from './WatchedMovie';

interface WatchedMovieListProps {
	watched: WatchedMovie[];
	onDeleteMovie: (id: string) => void;
}

const WatchedMovieList = ({
	watched,
	onDeleteMovie,
}: WatchedMovieListProps) => {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedMovie
					key={movie.imdbID}
					movie={movie}
					onDeleteMovie={onDeleteMovie}
				/>
			))}
		</ul>
	);
};

export default WatchedMovieList;
