class VideoStore {
	constructor(movies) {
		this._allMovies = movies;
	}

	isPermittedTo(customer, movie) {
		return customer.age > movie.rate;
	}

	getAvailableMoviesFor(customer) {
		var availableMovies = [];
		let allMovies = this._allMovies;
		allMovies = this.getPermittedMovies(customer);

		for (var i = 0; i < allMovies.length; i++) {
			var currentMovie = allMovies[i];
			availableMovies.add(new Movie(currentMovie.title, currentMovie.rate));
		}

		// ...

		return availableMovies;
	}

	getPermittedMovies(customer) {
		var movies = [];

		for (var i = 0; i < this._allMovies.length; i++) {
			var currentMovie = this._allMovies[i];

			if (currentMovie.rate > customer.age) {
				continue;
			}

			movies.add(new Movie(currentMovie.title, currentMovie.rate));
		}

		return movies;
	}
}

class Customer {
	constructor(age) {
		this._age = age;
	}

	get age() {
		return this._age;
	}
}

class Movie {
	constructor(title, rate) {
		this._title = title;
		this._rate = rate;
	}

	get title() {
		return this._title;
	}

	get rate() {
		return this._rate;
	}
}