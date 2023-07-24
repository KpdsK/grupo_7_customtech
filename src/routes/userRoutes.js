const express = require('express');
const userController = require('../controllers/userController');
const registerValidation = require('../middlewares/registerValidation');
const userRouter = express.Router();
const multer = require('multer');
const path = require('path');
const logMiddleware = require('../middlewares/logMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')


const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images'))
    },
    filename: (req, file, cb) => {
        let imageName = Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
})

const fileUpload = multer({
    storage: multerDiskStorage
})
// despues para edición vamos a necesitar de Multer

userRouter.get('/', userController.home);

userRouter.get('/productCart', logMiddleware, userController.productCart);

userRouter.get('/productWhisList', logMiddleware, userController.whisList);

userRouter.get('/login', guestMiddleware, userController.login);
userRouter.post('/users/login', userController.proccesLogin)

userRouter.get('/perfil',  logMiddleware ,userController.perfil);

userRouter.get('/register', guestMiddleware, userController.register);
userRouter.post('/users/register', fileUpload.single('fotoPerfil'), registerValidation, userController.processRegister);


module.exports = userRouter;