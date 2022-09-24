const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const {
  JWT,
  isProduction,
  CREATED_CODE,
  OK,
} = require('../utils/constants');

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

        .catch(next);
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
    .then((user) => {
      res.status(OK).send(user);
    })

    .catch(next);
};
