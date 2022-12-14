const {
  NODE_ENV,
  JWT_SECRET,
  PORT,
  DB_URL,
} = process.env;

const isProduction = NODE_ENV === 'production';
const JWT = isProduction ? JWT_SECRET : 'dev-secret';
const SERVER_PORT = isProduction ? PORT : 3001;
const dataBaseUrl = isProduction ? DB_URL : 'mongodb://localhost:27017/moviesdb';

const isValidityUrl = /^https?:\/\/(www\.)?[\w\d]*\.([\S\w._~:?#[\]@!$&'()*+,;=\-/])*#?$/;

const CREATED_CODE = 201;
const SERVER_ERROR = 500;

const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'https://api.catintonersDiplom.nomorepartiesxyz.ru',
  'http://api.catintonersDiplom.nomorepartiesxyz.ru',
];

module.exports = {
  JWT,
  SERVER_PORT,
  isValidityUrl,
  CREATED_CODE,
  SERVER_ERROR,
  DEFAULT_ALLOWED_METHODS,
  allowedCors,
  dataBaseUrl,
};
