const fs = require('fs');
const modeloDatos = require("./databaseController");

function getProductsFromDB() {
    return (JSON.parse(fs.readFileSync('src/database/db.json', 'utf8'))).db.productos;
}

function getProductsFromDBHome() {
    return (JSON.parse(fs.readFileSync('src/database/db.json', 'utf8'))).db.productosHome;
}

const basicController = {
    home: (req, res) => {
        res.render('home', { cssStyle: "home", productos: modeloDatos("product").listar().filter((row) => !row.borrado).slice(0,4) });
    },
    login: (req, res) => {
        res.render('users/login', { cssStyle: "login" });
    },
    register: (req, res) => {
        res.render('users/register', { cssStyle: "register" });
    },
    productCart: (req, res) => {
        res.render('productCart', { cssStyle: "carrito-whislist", productos: getProductsFromDB() });
    },
    whisList: (req, res) => {
        res.render('productWhisList', { cssStyle: "carrito-whislist", productos: getProductsFromDB() } );
    },
    
};

module.exports = basicController;