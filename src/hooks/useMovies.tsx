import { useState, useEffect } from 'react';

import { Response, ResponseStatus } from '../types/response';

import { KEY } from '../components/App';

export const useMovies = (query: string) => {
	const [movies, setMovies] = useState<Movie[]>([]);
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

		fetchMovie();
	}, [query]);

	return { movies, isLoading, error };
};
