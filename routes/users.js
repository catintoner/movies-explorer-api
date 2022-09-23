const userRouter = require('express').Router();

userRouter.get(
  '/me',
);

userRouter.patch(
  '/me',
);

module.exports = userRouter;
