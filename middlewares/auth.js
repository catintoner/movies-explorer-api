const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const IncorrectInfoError = require('../errors/IncorrectInfoError');

function handleAuthError() {
  throw new IncorrectInfoError('Необходима авторизация');
}

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    handleAuthError();
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    handleAuthError();
    return;
  }

  req.user = payload;

  next();
};
