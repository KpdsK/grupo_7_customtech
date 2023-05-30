const express = require('express')
const basicRouter = express.Router();

basicRouter.get('/', function (req, res) {
    res.render('home');
});

basicRouter.get('/productDetail', function (req, res) {
    res.render('products/productDetail');
});

basicRouter.get('/productCart', function (req, res) {
    res.render('productCart');
});

basicRouter.get('/productWhisList', function (req, res) {
    res.render('productWhisList');
});

basicRouter.get('/login', function (req, res) {
    res.render('users/login');
});

basicRouter.get('/register', function (req, res) {
    res.render('users/register');
});

module.exports = basicRouter;