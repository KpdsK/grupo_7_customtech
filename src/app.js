const express = require('express')
const path = require('path')
const app = express()
const routes = require('./routes/routes');

app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use('/', routes);

app.get('/404', (req, res)=>{
    res.send('Error página no encontrada')
});

app.listen(3007, function () {
    console.log('Aplicación ejemplo, escuchando el puerto 3007!');
});