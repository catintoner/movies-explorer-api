/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { SERVER_PORT, OK } = require('./utils/constants');

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cookieParser());

app.post('/signup', createUser);
app.post('/signin', login);
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').status(OK).send({ message: 'Выход' });
});

app.use('/', auth);
app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.use('*', (req, res, next) => {
  next(new Error('Запрашиваемая страница не найдена'));
});

app.use(errorLogger);

app.listen(SERVER_PORT, () => {
  console.log(`its my server on port ${SERVER_PORT}`);
});
