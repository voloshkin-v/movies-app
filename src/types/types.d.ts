export {};

declare global {
	interface Movie {
		imdbID: string;
		Title: string;
		Year: string;
		Poster: string;
	}

	interface MovieDetails extends Movie {
		Released: string;
		Runtime: string;
		Genre: string;
		imdbRating: string;
		Plot: string;
		Actors: string;
		Director: string;
	}

	interface WatchedMovie extends Movie {
		runtime: number;
		imdbRating: number;
		userRating: number;
		countRatingDecisions: number;
	}
}
