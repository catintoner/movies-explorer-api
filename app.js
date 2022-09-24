/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rateLimiter');

const { SERVER_PORT } = require('./utils/constants');
const centralHandlerErrors = require('./utils/centralHandlerErrors');

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('*', cors);

app.use(requestLogger);

app.use(cookieParser());

app.use('/', limiter, router);

app.use(errorLogger);

app.use(errors());

app.use(centralHandlerErrors);

app.listen(SERVER_PORT, () => {
  console.log(`its my server on port ${SERVER_PORT}`);
});
