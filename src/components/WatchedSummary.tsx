const average = (arr: number[]) => {
	const num = arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

	return num % 1 === 0 ? num : num.toFixed(2);
};

interface WatchedSummaryProps {
	watched: WatchedMovie[];
}

const WatchedSummary = ({ watched }: WatchedSummaryProps) => {
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));

	return (
		<div className="summary">
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	);
};

export default WatchedSummary;
