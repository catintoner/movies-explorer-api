const { isEmail } = require('validator');

const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const IncorrectInfoError = require('../errors/IncorrectInfoError');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
    },
  },

  password: {
    type: String,
    select: false,
    required: true,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password, next) {
  return this.findOne({ email }).select('password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new IncorrectInfoError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new IncorrectInfoError('Неправильные почта или пароль'));
          }

          return user;
        })

        .catch(next);
    })

    .catch(next);
};

module.exports = mongoose.model('user', userSchema);
