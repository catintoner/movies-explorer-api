const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = () => {
  throw new Error('Необходима авторизация');
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  if (!authorization) {
    handleAuthError();
    return;
  }

  const token = extractBearerToken(authorization);
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
