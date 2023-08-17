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

//const User = require ('../models/User.js')

const userController = {
    home: (req, res) => {
        res.render('home', { cssStyle: "home", productos: modeloDatos("product").listar().filter((row) => !row.borrado).slice(0,4) });
    },
    login: (req, res) => {
        res.render('users/login', { cssStyle: "login" });
    },

    proccesLogin:async(req,res) => {
        // const user = datos.find(row => row.email == req.body.email);
        const user = db.User.find(row => row.email == req.body.email).then(function (user) {return user}).catch((error) => {
            console.error('Usuario no encontrado: ', error);
        });
        const errors = {
            datosMal: {
                msg: "Datos Incorrectos",
            }
        }
        if(user) {
            if(await bcrypt.compare(req.body.contrasenia,user.contrasenia)) {
                delete user.contrasenia;
                req.session.userLog = user;
                if (req.body.cookie){
                    res.cookie("recordame", user.email, {maxAge: 1000*60*60})
                }
                return res.redirect('/perfil');
            } else {
                return res.render('users/login', {errors, cssStyle: "login"})
            }
        } else {
            return res.render('users/login', {errors, cssStyle: "login"})
        }
    },

    perfil: (req,res) => {
        const user = req.session.userLog
        res.render('users/perfil', { user: user ,cssStyle: "perfil" })
    },

    register: (req, res) => {
        res.render('users/register', { cssStyle: "register" });
    },

    processRegister: async(req, res) => {
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

        if(rdoValidacion.errors.length > 0) { 
            return res.render('users/register', { 
            cssStyle: "register",
            errors: rdoValidacion.mapped(), 
            oldData: req.body 
        })
        }

        //User.create(req.body);
        db.User.create(user)

        // fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), JSON.stringify([...datos, user], null, 2));
        return res.redirect('/')
    },

    
    productCart: (req, res) => {
        res.render('productCart', { cssStyle: "carrito-whislist", productos: getProductsFromDB() });
    },
    whisList: (req, res) => {
        res.render('productWhisList', { cssStyle: "carrito-whislist", productos: getProductsFromDB() } );
    },
    
};

module.exports = userController;