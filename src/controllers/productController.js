const fs = require('fs');
const path = require('path');
const datosProducto = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/product.json')))
function getProductsFromDBHome() {
    return (JSON.parse(fs.readFileSync('src/database/db.json', 'utf8'))).db.productosHome;
}


const productController = {
    newProduct: (req, res) => {
        res.render('products/newProduct', { cssStyle: "adminProduct"  });
    },

    processNewProduct: (req,res) => {
        const newProduct = {
            "id": datosProducto.length+1,
            "nombre": req.body.name,
            "descripcion": req.body.descripcion,
            "image": req.file.filename,
            "cantidad": req.body.productCantidad,
            "categoria": req.body.categories,
            "general": req.body.general,
            "carateristicas": req.body.caracteristicas,
            "compatibilidad": req.body.compatibilidad,
            "precio": req.body.precio,
        }
        console.log(newProduct.image)
        fs.writeFileSync(path.resolve(__dirname, '../database/product.json',), JSON.stringify([...datosProducto, newProduct],null, 2),"utf-8");
        return  res.redirect('/');
    },

    editProduct: (req, res) => {
        const editProduct = datosProducto.find((row) => row.id == req.params.id);
        if(editProduct) return res.render('products/editProduct', { cssStyle: "adminProduct", editProduct: editProduct });
        else return res.send('romi tuvo la culpa');
    },

    processEditProduct: (req,res) => {
        const editProduct = datosProducto.find((row) => row.id == req.params.id);

            for(let product of req.body) {
                editProduct[product] = req.body[product]
            }
        
        fs.writeFileSync(path.resolve(__dirname, '../database/product.json',), JSON.stringify(datosProducto ,null, 2),"utf-8");
        console.log(editProduct);
        return  res.redirect('/') 
    },
    productDetail: (req, res) => {
        const editProduct = datosProducto.find((row) => row.id == req.params.id);
        return  res.render('products/productDetail', { cssStyle: "product", editProduct: editProduct });
    },

    deleteProcess: (req, res) => {
        const editProduct = datosProducto.find(row => row.id == req.params.id) 
        editProduct.borrado = true
        fs.writeFileSync(path.resolve(__dirname, '../database/product.json'), JSON.stringify(datosProducto, null, 2), "utf-8") 
        return res.redirect("/")
    },
    listProducts : (req,res) => {
        const noErased =  datosProducto.filter((row) => row.borrado != true) 
        return res.render('products/listProducts', { cssStyle: "listProducts",  product: noErased} );
    }


};

module.exports = productController;