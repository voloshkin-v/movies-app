import React, { useEffect, useState } from 'react';

import NavBar from '../layouts/NavBar';
import Main from '../layouts/Main';
import Box from '../layouts/Box';

import Search from './Search';
import NumResult from './NumResult';
import MovieList from './MovieList';
import WatchedSummary from './WatchedSummary';
import WatchedMovieList from './WatchedMovieList';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import MovieDetails from './MovieDetails';

import { Response, ResponseStatus } from '../types/response';

const tempMovieData = [
	{
		imdbID: 'tt1375666',
		Title: 'Inception',
		Year: '2010',
		Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
	},
	{
		imdbID: 'tt0133093',
		Title: 'The Matrix',
		Year: '1999',
		Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
	},
	{
		imdbID: 'tt6751668',
		Title: 'Parasite',
		Year: '2019',
		Poster: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
	},
];

const tempWatchedData = [
	{
		imdbID: 'tt1375666',
		Title: 'Inception',
		Year: '2010',
		Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
		runtime: 148,
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID: 'tt0088763',
		Title: 'Back to the Future',
		Year: '1985',
		Poster: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
		runtime: 116,
		imdbRating: 8.5,
		userRating: 9,
	},
];

export const KEY = 'aff18a0c';

const App = () => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [watched, setWatched] = useState<WatchedMovie[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [query, setQuery] = useState('test');
	const [selectedId, setSelectedId] = useState<null | string>(null);

	useEffect(() => {
		const fetchMoview = async () => {
			try {
				setIsLoading(true);
				setError('');

				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
				);

				if (!response.ok) {
					throw new Error(
						'Something went wrong with fetching movies!'
					);
				}

				const data: Response = await response.json();

				if (data.Response === ResponseStatus.FAILED) {
					throw new Error(data.Error);
				}

				setMovies(data.Search);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		if (query.length < 3) {
			setMovies([]);
			setError('');

			return;
		}

		fetchMoview();
	}, [query]);

	const handleSelectMovie = (id: string) => {
		if (selectedId === id) {
			setSelectedId(null);

			return;
		}

		setSelectedId(id);
	};

	const handleCloseMovie = () => {
		setSelectedId(null);
	};

	return (
		<>
			<NavBar>
				<Search onSetQuery={setQuery} />
				<NumResult movies={movies} />
			</NavBar>

			<Main>
				<Box>
					{isLoading && <Loader />}
					{error && <ErrorMessage message={error} />}
					{!isLoading && !error && (
						<MovieList
							movies={movies}
							selectedMovie={selectedId}
							onSelectMovie={handleSelectMovie}
						/>
					)}
				</Box>

				<Box>
					{selectedId ? (
						<MovieDetails
							key={selectedId}
							selectedMovie={selectedId}
							onCloseMovie={handleCloseMovie}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMovieList watched={watched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
};

export default App;
