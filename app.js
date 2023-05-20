const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/login.html'));
});

app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/register.html'));
});

app.get('/productDetail', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/productDetail.html'));
});

app.get('/productCart', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/productCart.html'));
});

app.get('/productWhisList', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/productWhisList.html'));
});

app.get('/404', (req, res)=>{
    res.send('Error página no encontrada')
});

app.listen(3000, function () {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});