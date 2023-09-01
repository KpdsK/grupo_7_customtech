const db = require("../database/models");
const { validationResult } = require("express-validator");

const createObjectFromDataBody = (req) => {
    return {
        "name": req.body.name,
        "description": req.body.descripcion,
        "image": (req.file) ? req.file.filename : '',
        "stock": req.body.productCantidad,
        "id_category": req.body.categories,
        //"general": req.body.general,
        //"carateristicas": req.body.caracteristicas,
        //"compatibilidad": req.body.compatibilidad,
        "price": req.body.precio,
        "created_at": Date.now(),
    }
}

const productController = {
    newProduct: (req, res) => {
        db.Category.findAll({ attributes: ['id', 'name'], raw: true })
            .then(function (arrCategorias) {
                res.render('products/newProduct', { cssStyle: "adminProduct", categorias: arrCategorias });
            })
    },

    processNewProduct: async (req, res) => {
        const rdoValidacion = validationResult(req)
        if (rdoValidacion.errors.length > 0) {
            await db.Category.findAll({ attributes: ['id', 'name'], raw: true })
                .then(function (arrCategorias) {
                    return res.render('products/newProduct', {
                        cssStyle: "adminProduct",
                        categorias: arrCategorias,
                        oldReq: req.body,
                        errors: rdoValidacion.mapped()
                    })
                })
        } else {
            const newProduct = createObjectFromDataBody(req);
            db.Product.create(newProduct);
            return res.redirect('/');
        }
    },

    editProduct: async (req, res) => {
        await db.Product.findAll(
            { where: { id: req.params.id, erased: false }, raw: true })
            .then(function (editProduct) {
                console.log(editProduct[0])
                db.Category.findAll({ attributes: ['id', 'name'], raw: true })
                    .then(function (arrCategorias) {
                        console.log(editProduct[0])
                        if (editProduct[0]) return res.render('products/newProduct', { cssStyle: "adminProduct", editProduct: editProduct[0], categorias: arrCategorias });
                        else return res.send('romi tuvo la culpa');
                    })
            })
    },

    processEditProduct: async (req, res) => {
        const obj = {
            name: req.body.name,
            description: req.body.descripcion,
            price: req.body.precio,
            stock: req.body.productCantidad,
            id_category: req.body.categories,
            updated_at: Date.now(),
        };
        if (req.file){obj = {image: req.file.filename, ...obj} }
        console.log(obj)
        await db.Product.update(obj, {
            where: {
                id: req.params.id,
            }
        });
        return res.redirect('/')
    },

    productDetail: async (req, res) => {
        console.log(req.params.id)
        const productData = await db.Product.findAll()
        await db.Product.findAll(
            { where: { id: req.params.id, erased: false }, raw: true })
            .then(function (product) {
                return res.render('products/productDetail', { cssStyle: "product", editProduct: product[0], products: productData.filter((row) => !row.erased).slice(0, 4) });
            })
    },

    deleteProcess: async (req, res) => {
        console.log(req.params.id)
        await db.Product.update({
            erased: true,
        }, {
            where: {
                id: req.params.id,
            }
        });
        return res.redirect('/')
    },

    listProducts: async (req, res) => {
        await db.Product.findAll(
            { where: { erased: false }, raw: true })
            .then(function (productList) {
                return res.render('products/listProducts', { cssStyle: "listProducts", product: productList });
            })
    }
};

module.exports = productController;