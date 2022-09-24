const { NODE_ENV, JWT_SECRET, PORT } = process.env;

const isProduction = NODE_ENV === 'production';
const JWT = isProduction ? JWT_SECRET : 'dev-secret';
const SERVER_PORT = isProduction ? PORT : 3001;

const isValidityUrl = /^https?:\/\/(www\.)?[\w\d]*\.([\S\w._~:?#[\]@!$&'()*+,;=\-/])*#?$/;

const OK = 200;
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
  OK,
  CREATED_CODE,
  SERVER_ERROR,
  DEFAULT_ALLOWED_METHODS,
  allowedCors,
};
