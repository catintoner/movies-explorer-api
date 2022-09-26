const Movie = require('../models/movie');

const { CREATED_CODE } = require('../utils/constants');

const ValidateError = require('../errors/ValidateError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => {
      res.send(movies);
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
    trailerLink,
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
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => {
      res.status(CREATED_CODE).send(movie);
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidateError('Указанные данные не корректны'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Данный фильм не найден'))

    .then((movie) => {
      const ownerId = movie.owner.toString();

      if (ownerId === req.user._id) {
        Movie.findByIdAndDelete(movie)
          .then(() => {
            res.send({ message: 'Фильм удален из избранных' });
          })

          .catch(next);
      } else {
        throw new ForbiddenError('Нет прав для удаления фильма');
      }
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidateError('Указанные данные не корректны'));
      } else {
        next(err);
      }
    });
};
