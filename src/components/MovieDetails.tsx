import React, { useEffect, useState } from 'react';

import { KEY } from './App';

import Loader from './Loader';
import StarRating from './StarRating';

interface MovieDetailsProps {
	selectedMovie: string;
	onCloseMovie: () => void;
	onAddMovie: (watchedMovie: WatchedMovie) => void;
	watchedMovies: WatchedMovie[];
}

const MovieDetails = ({
	selectedMovie,
	onCloseMovie,
	onAddMovie,
	watchedMovies,
}: MovieDetailsProps) => {
	const [movie, setMovie] = useState<MovieDetails>({} as MovieDetails);
	const [userRating, setUserRating] = useState<number>(0);

	const {
		Title: title,
		Year: year,
		Genre: genre,
		Poster: poster,
		Released: released,
		Runtime: runtime,
		imdbRating,
		Actors: actors,
		Director: director,
		Plot: plot,
		imdbID,
	} = movie;

	const currentWatchedMovie = watchedMovies.find(
		(movieItem) => movieItem.imdbID === imdbID
	);

	useEffect(() => {
		const getMovieDetails = async () => {
			const response = await fetch(
				`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovie}`
			);

			const data = await response.json();

			setMovie(data);
		};

		getMovieDetails();
	}, [selectedMovie]);

	useEffect(() => {
		if (!title) return;

		document.title = `Movie | ${title}`;

		return () => {
			document.title = 'usePopcorn';
		};
	}, [title]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code !== 'Escape') {
				return;
			}

			onCloseMovie();
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onCloseMovie]);

	const handleAddClick = () => {
		const watchedMovie = {
			imdbID,
			Title: title,
			Year: year,
			Poster: poster,
			runtime: parseInt(runtime) ? parseInt(runtime) : 0,
			imdbRating: +imdbRating ? +imdbRating : 0,
			userRating,
		};

		onCloseMovie();
		onAddMovie(watchedMovie);
	};

	if (!Object.keys(movie).length) {
		return <Loader />;
	}

	return (
		<div className="details">
			<header>
				<button onClick={onCloseMovie} className="btn-back">
					←
				</button>

				<div className="image">
					<img src={poster} alt={`Poster of ${title} movie`} />
				</div>

				<div className="details-overview">
					<h2>{year}</h2>
					<p>
						{released} &bull; {runtime}
					</p>
					<p>{genre}</p>
					<p>
						<span>⭐️</span> {imdbRating} IMDb rating
					</p>
				</div>
			</header>

			<section>
				<div className="rating">
					{currentWatchedMovie ? (
						<p>
							The movie has been added to the list. User rating:{' '}
							{currentWatchedMovie.userRating}
						</p>
					) : (
						<>
							<StarRating
								onSetRating={setUserRating}
								maxRating={10}
							/>

							{userRating !== 0 && (
								<button
									className="btn-add"
									onClick={handleAddClick}
								>
									+ Add to list
								</button>
							)}
						</>
					)}

					<p>
						<em>{plot}</em>
					</p>
					<p>Starring: {actors}</p>
					<p>Directed by {director}</p>
				</div>
			</section>
		</div>
	);
};

export default MovieDetails;
