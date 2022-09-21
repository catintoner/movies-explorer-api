const { NODE_ENV, JWT_SECRET, PORT } = process.env;

const isProduction = NODE_ENV === 'production';

const JWT = isProduction ? JWT_SECRET : 'dev-secret';

const SERVER_PORT = isProduction ? PORT : 3001;

module.exports = {
  JWT,
  SERVER_PORT,
};