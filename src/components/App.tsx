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

export const KEY = 'aff18a0c';

const App = () => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [watched, setWatched] = useState<WatchedMovie[]>(() => {
		const storedValue = localStorage.getItem('movies');
		return JSON.parse(storedValue!) || [];
	});
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState<null | string>(null);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchMovie = async () => {
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

		handleCloseMovie();
		fetchMovie();
	}, [query]);

	useEffect(() => {
		localStorage.setItem('movies', JSON.stringify(watched));
	}, [watched]);

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

	const handleAddMovie = (watchedMovie: WatchedMovie) => {
		setWatched((watched) => [...watched, watchedMovie]);
	};

	const handleDeleteMovie = (id: string) => {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	};

	return (
		<>
			<NavBar>
				<Search query={query} onSetQuery={setQuery} />
				<NumResult movies={movies} />
			</NavBar>

			<Main>
				<Box>
					{isLoading && <Loader />}
					{error && <ErrorMessage message={error} />}

					{!isLoading && !error && movies.length === 0 && (
						<Loader>Use the search to find movies 🔎</Loader>
					)}

					{!isLoading && !error && movies.length > 0 && (
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
							onAddMovie={handleAddMovie}
							watchedMovies={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							{watched.length > 0 && (
								<WatchedMovieList
									watched={watched}
									onDeleteMovie={handleDeleteMovie}
								/>
							)}
						</>
					)}
				</Box>
			</Main>
		</>
	);
};

export default App;
