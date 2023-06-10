const fs = require('fs');

function getProductsFromDB() {
    return (JSON.parse(fs.readFileSync('src/database/db.json', 'utf8'))).db.productos;
}

function getProductsFromDBHome() {
    return (JSON.parse(fs.readFileSync('src/database/db.json', 'utf8'))).db.productosHome;
}

const basicController = {
    home: (req, res) => {
        res.render('home', { cssStyle: "home", productos: getProductsFromDBHome() });
    },
    login: (req, res) => {
        res.render('users/login', { cssStyle: "login" });
    },
    register: (req, res) => {
        res.render('users/register', { cssStyle: "register" });
    },
    productDetail: (req, res) => {
        res.render('products/productDetail', { cssStyle: "product", productos: getProductsFromDBHome() });
    },
    productCart: (req, res) => {
        res.render('productCart', { cssStyle: "carrito-whislist", productos: getProductsFromDB() });
    },
    whisList: (req, res) => {
        res.render('productWhisList', { cssStyle: "carrito-whislist", productos: getProductsFromDB() } );
    },
    newProduct: (req, res) => {
        res.render('newProduct', { cssStyle: "adminProduct" });
    },

    editProduct: (req, res) => {
        res.render('editProduct', { cssStyle: "adminProduct" });
    }
};

module.exports = basicController;