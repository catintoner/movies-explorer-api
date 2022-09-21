/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { SERVER_PORT } = require('./utils/constants');

const app = express();

mongoose.connect('mongodb://localhostP:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.listen(SERVER_PORT, () => {
  console.log(`its my server on port ${SERVER_PORT}`);
});