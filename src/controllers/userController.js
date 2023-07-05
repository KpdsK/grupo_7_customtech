const modeloDatos = require("./databaseController");
const fs = require('fs');
const path = require('path')

function getProductsFromDB() {
    return modeloDatos("product").listar().filter((row) => row.borrado != true);
}

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
    register: (req, res) => {
        res.render('users/register', { cssStyle: "register" });
    },

    processRegister: (req, res) => {

        const user = {
            "id": datos.length + 1,
            "nombreCompleto": req.body.nombre,
            "email": req.body.email,
            "image": req.body.fotoPerfil,
            "contrasenia": req.body.password
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

        fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), JSON.stringify([...datos, user], null, 2));
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