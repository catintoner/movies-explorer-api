const { SERVER_ERROR } = require('./constants');

module.exports = function centralHandlerErrors(err, req, res, next) {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
  }

  next();
};
