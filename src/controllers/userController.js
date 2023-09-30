const db = require("../database/models");
const fs = require('fs');
const path = require('path')
const bcrypt = require('bcryptjs')

const { validationResult } = require("express-validator");


const userController = {
    home: async (req, res) => {
        const productsData = await db.Product.findAll({ where: { recommended: true, erased: false } })
        res.render('home', { cssStyle: "home", productos: productsData });
    },
    login: (req, res) => {
        res.render('users/login', { cssStyle: "login" });
    },

    proccesLogin: async (req, res) => {
        const rdoValidacion = validationResult(req)
        if (rdoValidacion.errors.length > 0) {
            return res.render('users/login', {
                cssStyle: "login",
                errors: rdoValidacion.mapped(),
                oldData: req.body
            })
        }
        return res.redirect('/perfil');
    },


    logOut: async (req, res) =>  {
        req.session.destroy();
        return res.redirect('/')
    },

    perfil: (req, res) => {
        const user = req.session.userLog
        res.render('users/perfil', { user: user, cssStyle: "perfil" })
    },

    register: (req, res) => {
        res.render('users/register', { cssStyle: "register" });
    },

    processRegister: async (req, res) => {
        const rdoValidacion = validationResult(req)

        if (rdoValidacion.errors.length > 0) {
            return res.render('users/register', {
                cssStyle: "register",
                errors: rdoValidacion.mapped(),
                editProduct: req.body
            })
        }

        const user = {
            "name": req.body.nombre,
            "email": req.body.email,
            "image": req.file ? req.file.filename : '',
            "password": await bcrypt.hash(req.body.contrasenia, 10),
            "created_at": Date.now(),
        }

        db.User.create(user)

        return res.redirect('/')
    },

    updateUserData: async (req, res) => {
        const rdoValidacion = validationResult(req)

        if (rdoValidacion.errors.length > 0) {
            return res.render('users/perfil', {
                errors: rdoValidacion.mapped(),
                user: { "id": req.params.id, ...req.body },
                cssStyle: "perfil"
            })
        }
        const userDB = await db.User.findAll({ where: { email: req.body.email } }).then(function (user) { return user[0] }).catch((error) => {
            console.error('Usuario no encontrado: ', error);
        });
        await db.User.update({
            name: req.body.nombre ? req.body.nombre : userDB.name,
            email: req.body.email ? req.body.email : userDB.email,
            image: req.file ? req.file.filename : userDB.image,
            password: req.body.contrasenia ? await bcrypt.hash(req.body.contrasenia, 10) : userDB.password,
            updated_at: Date.now(),
        }, {
            where: {
                id: req.params.id,
            }
        });
        const user = {
            "id": req.params.id,
            "name": req.body.nombre ? req.body.nombre : userDB.name,
            "email": req.body.email ? req.body.email : userDB.email,
            "image": req.file ? req.file.filename : userDB.image,
        }
        req.session.userLog = user;
        return res.redirect('/perfil');
    },

    deleteUser: async (req, res) => {
        await db.User.update({
            erased: true,
        }, {
            where: {
                id: req.params.id,
            }
        });
        req.session.destroy()
        return res.redirect('/')
    },

    productCart: async (req, res) => {
        const productsData = await db.User.findAll({
            where: { id: req.session.userLog.id },
            attributes: ["name"],
            include: {
                model: db.Product,
                as: 'product_cart',
                through: {
                    association: db.Product.ProductCart,
                    attributes: ["amount"]
                },
                where: { erased: false },
                attributes: ["id","price", "name", "description", "image"]
            }
        }
        );
        // let prod = productsData.pop().product_cart;
        let prod = productsData.length!=0 ? productsData.pop().product_cart : [];
        return res.render('productCart', { cssStyle: "carrito-whislist", productos: prod });
    },
    deleteProductCart: async (req, res) => {
        const productsData = await db.ProductCart.destroy({
            where: { id_user: req.session.userLog.id, id_product: req.body.id_product }}
        );
        return res.status(200).json('{"resultado":"ok"}');
    },
    addProductCart: async (req, res) => {
        const productsData = await db.ProductCart.upsert({ id_user: req.session.userLog.id,
            id_product: req.body.id_product, amount: req.body.amount });
        return res.status(200).json('{"resultado":"ok"}');
    },
    updateProductCart: async (req, res) => {
        const productsData = await db.ProductCart.update({
                amount: req.body.amount,
            },{
            where: { id_user: req.session.userLog.id, id_product: req.body.id_product }}
        );
        return res.status(200).json('{"resultado":"ok"}');
    },
    wishList: async (req, res) => {
        const productsData = await db.User.findAll({
            where: { id: req.session.userLog.id },
            attributes: ["name"],
            include: {
                model: db.Product,
                as: 'wish_list',
                through: {
                    association: db.Product.WishList
                },
                where: { erased: false },
                attributes: ["id","price", "name", "description", "image"]
            }
        }
        );
        let prod = productsData.length!=0 ? productsData.pop().wish_list : [];
        return res.render('productWishList', { cssStyle: "carrito-whislist", productos: prod });
    },
    deleteWishList: async (req, res) => {
        const productsData = await db.WishList.destroy({
            where: { id_user: req.session.userLog.id, id_product: req.body.id_product }}
        );
        return res.status(200).json('{"resultado":"ok"}');
    },
    addToWishList: async (req, res) => {
        const productsData = await db.WishList.upsert({ id_user: req.session.userLog.id,
            id_product: req.body.id_product });
        return res.status(200).json('{"resultado":"ok"}');
    },

};

module.exports = userController;