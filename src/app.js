const express = require('express')
const path = require('path')
const app = express()
const routes = require('./routes/routes');
const productRoutes = require('./routes/productRoutes');
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', './src/views');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));

app.use('/', routes);
app.use('/products' ,productRoutes);

app.get('/404', (req, res)=>{
    res.send('Error página no encontrada')
});

app.listen(3007, function () {
    console.log('Aplicación ejemplo, escuchando el puerto 3007!');
});