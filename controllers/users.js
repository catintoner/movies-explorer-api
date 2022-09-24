const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const UniqueEmailError = require('../errors/UniqueEmailError');
const ValidateError = require('../errors/ValidateError');

const {
  JWT,
  isProduction,
  CREATED_CODE,
  OK,
} = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
      })
        .then((userInfo) => {
          const user = userInfo.toObject();
          delete user.password;
          res.status(CREATED_CODE).send(user);
        })

        .catch((err) => {
          if (err.code === 11000) {
            next(new UniqueEmailError('Пользователь с таким Email уже существует'));
            return;
          }

          if (err.name === 'ValidationError') {
            next(new ValidateError('Указанные данные не корректны'));
          } else {
            next(err);
          }
        });
    })

    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        JWT,
        {
          expiresIn: '7d',
        },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: isProduction,
      }).status(OK).send(user._id);
    })

    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.status(OK).send(user);
    })

    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError('Пользователь не найден'))

    .then((user) => {
      res.status(OK).send(user);
    })

    .catch((err) => {
      if (err.code === 11000) {
        next(new UniqueEmailError('Пользователь с таким Email уже существует'));
        return;
      }

      if (err.name === 'ValidationError') {
        next(new ValidateError('Указанные данные не корректны'));
      } else {
        next(err);
      }
    });
};
