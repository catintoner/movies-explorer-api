const router = require('express').Router();

const { createUser, login } = require('../controllers/users');

const { validateUserCreation, validateLogin } = require('../middlewares/validations');
const auth = require('../middlewares/auth');

const userRouter = require('./users');
const movieRouter = require('./movies');

const NotFoundError = require('../errors/NotFoundError');

const { OK } = require('../utils/constants');

router.post('/signup', validateUserCreation, createUser);
router.post('/signin', validateLogin, login);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').status(OK).send({ message: 'Выход' });
});

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

module.exports = router;
