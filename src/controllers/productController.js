const modeloDatos = require("./databaseController");

const createObjectFromDataBody = (req) => {
    return {
        "id": req.body.id,
        "nombre": req.body.name,
        "descripcion": req.body.descripcion,
        "image": (req.file) ? req.file.filename : '',
        "cantidad": req.body.productCantidad,
        "categoria": req.body.categories,
        "general": req.body.general,
        "carateristicas": req.body.caracteristicas,
        "compatibilidad": req.body.compatibilidad,
        "precio": req.body.precio,
        "borrado": (req.body.borrado) ? req.body.borrado : false
    }
}

const productController = {
    newProduct: (req, res) => {
        res.render('products/newProduct', { cssStyle: "adminProduct"  });
    },

    processNewProduct: (req,res) => {
        const newProduct = createObjectFromDataBody(req);
        modeloDatos("product").crear(newProduct);
        return  res.redirect('/');
    },

    editProduct: (req, res) => {
        const editProduct = modeloDatos("product").buscar(req.params.id);
        if(editProduct) return res.render('products/newProduct', { cssStyle: "adminProduct", editProduct: editProduct });
        else return res.send('romi tuvo la culpa');
    },

    processEditProduct: (req,res) => {
        const productToModify = createObjectFromDataBody(req);
        if (!productToModify.image) { productToModify.image = modeloDatos("product").buscar(productToModify.id).image }
        modeloDatos("product").modificar(productToModify);
        return res.redirect('/') 
    },
    productDetail: (req, res) => {
        const product = modeloDatos("product").buscar(req.params.id);
        return  product.borrado ? res.send('El producto no Existe') : res.render('products/productDetail', { cssStyle: "product", editProduct: product, products: modeloDatos("product").listar().filter((row) => !row.borrado).slice(0,4) });
    },

    deleteProcess: (req, res) => {
        const productToDelete = modeloDatos("product").buscar(req.params.id);
        productToDelete.borrado = true
        modeloDatos("product").modificar(productToDelete);
        return res.redirect("/")
    },
    listProducts : (req,res) => {
        const noErased =  modeloDatos("product").listar().filter((row) => row.borrado != true) 
        return res.render('products/listProducts', { cssStyle: "listProducts",  product: noErased} );
    }
};

module.exports = productController;