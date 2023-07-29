import React, { useEffect, useState } from 'react';

import { KEY } from './App';

import Loader from './Loader';
import StarRating from './StarRating';

interface MovieDetailsProps {
	selectedMovie: string;
	onCloseMovie: () => void;
}

const MovieDetails = ({ selectedMovie, onCloseMovie }: MovieDetailsProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [movie, setMovie] = useState<MovieDetails>({} as MovieDetails);
	const [rating, setRating] = useState<null | number>(null);

	const {
		Title,
		Year,
		Genre,
		Poster,
		Released,
		Runtime,
		imdbRating,
		Actors,
		Director,
		Plot,
	} = movie;

	console.log(Title);

	useEffect(() => {
		const getMovieDetails = async () => {
			const response = await fetch(
				`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovie}`
			);

			const data = await response.json();
			setIsLoading(false);
			setMovie(data);

			console.log(data);
		};

		getMovieDetails();
	}, [selectedMovie]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="details">
			<header>
				<button onClick={onCloseMovie} className="btn-back">
					←
				</button>
				<img src={Poster} alt={`Poster of ${Title} movie`} />
				<div className="details-overview">
					<h2>{Title}</h2>
					<p>
						{Released} • {Runtime}
					</p>
					<p>{Genre}</p>
					<p>
						<span>⭐️</span> {imdbRating} IMDb rating
					</p>
				</div>
			</header>

			<section>
				<div className="rating">
					<StarRating onSetRating={setRating} maxRating={10} />
					<p>
						<em>{Plot}</em>
					</p>
					<p>Starring: {Actors}</p>
					<p>Directed by {Director}</p>
				</div>
			</section>
		</div>
	);
};

export default MovieDetails;
