const userRouter = require('express').Router();

const { getUserInfo, updateUserInfo } = require('../controllers/users');

const { validateNewUserInfo } = require('../middlewares/validations');

userRouter.get(
  '/me',
  getUserInfo,
);

userRouter.patch(
  '/me',
  validateNewUserInfo,
  updateUserInfo,
);

module.exports = userRouter;
