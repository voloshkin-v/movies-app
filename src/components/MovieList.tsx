import React, { useState } from 'react';
import Movie from './Movie';

interface MovieListProps {
	movies: Movie[];
	selectedMovie: null | string;
	onSelectMovie: (id: string) => void;
}

const MovieList = ({
	movies,
	onSelectMovie,
	selectedMovie,
}: MovieListProps) => {
	return (
		<ul className="list list-movies">
			{movies.map((movie) => (
				<Movie
					key={movie.imdbID}
					movie={movie}
					onSelectMovie={onSelectMovie}
					selectedMovie={selectedMovie}
				/>
			))}
		</ul>
	);
};

export default MovieList;
