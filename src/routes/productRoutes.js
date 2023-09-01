const express =  require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');
const path = require('path');
const multer = require('multer');
const validateCreateProduct = require('../middlewares/validateCreateProduct');


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
productRouter.get('/create', productController.newProduct);
productRouter.post('/', fileUpload.single('image'), validateCreateProduct, productController.processNewProduct);

// edit
productRouter.get('/:id/edit', productController.editProduct);
productRouter.put('/:id',  fileUpload.single('image'), validateCreateProduct, productController.processEditProduct);

// delete 
productRouter.delete('/:id', productController.deleteProcess);

// productDetail 
productRouter.get('/:id', productController.productDetail);

// listPorduct
productRouter.get('/', productController.listProducts);


module.exports = productRouter;