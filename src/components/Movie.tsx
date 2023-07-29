import React from 'react';

interface MovieProps {
	movie: Movie;
	selectedMovie: null | string;
	onSelectMovie: (id: string) => void;
}

const Movie = ({ movie, selectedMovie, onSelectMovie }: MovieProps) => {
	return (
		<li
			onClick={() => onSelectMovie(movie.imdbID)}
			className={`${movie.imdbID === selectedMovie ? 'selected' : ''}`}
		>
			{movie.Poster !== 'N/A' && (
				<img src={movie.Poster} alt={`${movie.Title} poster`} />
			)}

			<div>
				<h3>{movie.Title}</h3>
				<div>
					<p>
						<span>📅</span>
						<span>{movie.Year}</span>
					</p>
				</div>
			</div>
		</li>
	);
};

export default Movie;
