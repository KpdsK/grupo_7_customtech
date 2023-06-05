const basicController = {
    home: (req, res) => {
        res.render('home');
    },
    login: (req, res) => {
        res.render('users/login');
    },
    register: (req, res) => {
        res.render('users/register');
    },
    productDetail: (req, res) => {
        res.render('products/productDetail');
    },
    productCart: (req, res) => {
        res.render('productCart');
    },
    whisList: (req, res) => {
        res.render('productWhisList');
    },
    newProduct: (req, res) => {
        res.render('newProduct');
    },

    editProduct: (req, res) => {
        res.render('editProduct');
    }
};

module.exports = basicController;