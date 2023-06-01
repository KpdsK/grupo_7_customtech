const express = require('express');
const basicController = require('../controllers/basicController');
const basicRouter = express.Router();

basicRouter.get('/', basicController.home);

basicRouter.get('/productDetail', basicController.productDetail);

basicRouter.get('/productCart', basicController.productCart);

basicRouter.get('/productWhisList', basicController.whisList);

basicRouter.get('/login', basicController.login);

basicRouter.get('/register', basicController.register);

module.exports = basicRouter;