const modeloDatos = require("./databaseController");
const db = require("../database/models");
const fs = require('fs');
const path = require('path')
const bcrypt = require('bcryptjs')

// function getProductsFromDB() {
//     return db.User.findAll() ("product").listar().filter((row) => row.borrado != true);
// }

const { validationResult } = require("express-validator");

const datos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));


const userController = {
    home: async (req, res) => {
        const productsData = await db.Product.findAll()
        res.render('home', { cssStyle: "home", productos: productsData.filter((row) => !row.erased).slice(0, 4) });
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

    perfil: (req, res) => {
        const user = req.session.userLog
        res.render('users/perfil', { user: user, cssStyle: "perfil" })
    },

    register: (req, res) => {
        res.render('users/register', { cssStyle: "register" });
    },

    processRegister: async (req, res) => {
        console.log(req.body)
        const user = {
            "name": req.body.nombre,
            "email": req.body.email,
            "image": req.file ? req.file.filename : '',
            "password": await bcrypt.hash(req.body.contrasenia, 10),
            "created_at": Date.now(),
        }

        const rdoValidacion = validationResult(req)
        console.log(rdoValidacion.errors)

        if (rdoValidacion.errors.length > 0) {
            return res.render('users/register', {
                cssStyle: "register",
                errors: rdoValidacion.mapped(),
                oldData: req.body
            })
        }

        db.User.create(user)

        return res.redirect('/')
    },

    updateUserData: async (req, res) => {
        console.log(req.body)
        const rdoValidacion = validationResult(req)
        console.log(rdoValidacion.errors)

        if (rdoValidacion.errors.length > 0) {
            return res.render('users/perfil', {
                errors: rdoValidacion.mapped(),
                user: {"id":req.params.id,...req.body},
                cssStyle: "perfil"
            })
        }
        console.log('req.body')
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
        console.log(req.params)
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

    productCart: (req, res) => {
        res.render('productCart', { cssStyle: "carrito-whislist", productos: getProductsFromDB() });
    },
    whisList: (req, res) => {
        res.render('productWhisList', { cssStyle: "carrito-whislist", productos: getProductsFromDB() });
    },

};

module.exports = userController;