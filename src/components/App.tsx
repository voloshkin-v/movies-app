import { useCallback, useEffect, useState } from 'react';

import { useMovies } from '../hooks/useMovies';

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

export const KEY = 'aff18a0c';

const App = () => {
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState<null | string>(null);
	const { movies, isLoading, error } = useMovies(query);

	const [watched, setWatched] = useState<WatchedMovie[]>(() => {
		const storedValue = localStorage.getItem('movies');
		return JSON.parse(storedValue!) || [];
	});

	useEffect(() => {
		localStorage.setItem('movies', JSON.stringify(watched));
	}, [watched]);

	const handleCloseMovie = () => {
		setSelectedId(null);
	};

	const handleSelectMovie = (id: string) => {
		if (selectedId === id) {
			setSelectedId(null);

			return;
		}

		setSelectedId(id);
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
