const express =  require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');
const path = require('path');
const multer = require('multer');


const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images'))
    },
    filename: (req, file, cb) => {
        let imageName = Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
});


const fileUpload = multer({
    storage: multerDiskStorage
});


// new product

productRouter.get('/newProduct', productController.newProduct);
productRouter.post('/newProduct', fileUpload.single('image') ,productController.processNewProduct);

// edit

productRouter.get('/editProduct/:id', productController.editProduct);
productRouter.put('/editProduct/:id',  fileUpload.single('image'), productController.processEditProduct);

// delete 

productRouter.delete('/editProduct/:id', productController.deleteProcess);

// productDetail 
productRouter.get('/productDetail/:id', productController.productDetail);

module.exports = productRouter;