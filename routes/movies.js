const movieRouter = require('express').Router();

const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

const { validateMovieCreation, validateMovieId } = require('../middlewares/validations');

movieRouter.get(
  '/',
  getMovies,
);

movieRouter.post(
  '/',
  validateMovieCreation,
  createMovie,
);

movieRouter.delete(
  '/:movieId',
  validateMovieId,
  deleteMovie,
);

module.exports = movieRouter;
