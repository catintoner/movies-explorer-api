const Movie = require('../models/movie');

const { OK, CREATED_CODE } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(OK).send(movies);
    })

    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink: trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => {
      res.status(CREATED_CODE).send(movie);
    })

    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      const ownerId = movie.owner.toString();

      if (ownerId === req.user._id) {
        Movie.findByIdAndDelete(movie)
          .then(() => {
            res.status(OK).send({ message: 'Фильм удален из избранных' });
          })

          .catch(next);
      } else {
        throw new Error('Нет прав для удаления фильма');
      }
    })

    .catch(next);
};
