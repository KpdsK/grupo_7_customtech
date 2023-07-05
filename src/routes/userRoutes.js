const express = require('express');
const userController = require('../controllers/userController');
const registerValidation = require('../middlewares/registerValidation');
const userRouter = express.Router();

userRouter.get('/', userController.home);

userRouter.get('/productCart', userController.productCart);

userRouter.get('/productWhisList', userController.whisList);

userRouter.get('/login', userController.login);

userRouter.get('/register', userController.register);
userRouter.post('/register',registerValidation, userController.processRegister);


module.exports = userRouter;