const movieRouter = require('express').Router();

movieRouter.get(
  '/movies',
);

movieRouter.post(
  '/movies',
);

movieRouter.delete(
  '/movies/:movieId',
);
module.exports = movieRouter;
