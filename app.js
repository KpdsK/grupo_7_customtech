const express = require('express')
const path = require('path')
const app = express()
const basicRouter = require('./routes/routes')
const productRouter = require('./routes/productRoutes')

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');


app.listen(3000, function () {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});


app.use(basicRouter)
app.use(productRouter)
