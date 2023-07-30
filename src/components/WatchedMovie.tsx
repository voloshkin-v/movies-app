import React from 'react';

interface WatchedMovieProps {
	movie: WatchedMovie;
	onDeleteMovie: (id: string) => void;
}

const WatchedMovie = ({ movie, onDeleteMovie }: WatchedMovieProps) => {
	return (
		<li>
			{movie.Poster !== 'N/A' && (
				<img src={movie.Poster} alt={`${movie.Title} poster`} />
			)}

			<div>
				<h3>{movie.Title}</h3>
				<div className="stats">
					<p>
						<span>⭐️</span>
						<span>{movie.imdbRating}</span>
					</p>
					<p>
						<span>🌟</span>
						<span>{movie.userRating}</span>
					</p>
					<p>
						<span>⏳</span>
						<span>{movie.runtime} min</span>
					</p>

					<button
						className="btn-delete"
						onClick={() => onDeleteMovie(movie.imdbID)}
					>
						X
					</button>
				</div>
			</div>
		</li>
	);
};

export default WatchedMovie;
