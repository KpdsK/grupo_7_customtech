const modeloDatos = require("./databaseController");

function getProductsFromDB() {
    return modeloDatos("product").listar().filter((row) => row.borrado != true);
}
const { validationResult } = require("express-validator"); //PARA PODER USAR REGISTERVALIDATION.JS

const User = require ('../models/User.js')

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

        // RESULTADO DE LA VALIDACIÓN: ESTO GUARDA UN OBJETO LITERAL QUE TIENE UNA PROPIEDAD QUE SE LLAMA "ERRORS"
        // QUE TIENE UN ARRAY CON ERRORES
        const rdoValidacion = validationResult(req)
        console.log(rdoValidacion.errors) 

        if(rdoValidacion.errors.length > 0) { //SI ERRORS (QUE ES UN ARRAY ) TIENE UNA LONGITUD MAYOR A 0 SE VERIFICA QUE HAY ERRORES
            return res.render('register', { 
            errors: rdoValidacion.mapped(), 
            oldData: req.body //OLDDATA PARA QUE QUEDE LO LLENADO POR EL USUARIO
        })
        }

        User.create(req.body);

        //fs.writeFileSync(path.resolve(//__dirname, '../database/user.json'), JSON.stringify([...allUsers, newUser], null, 2));
        return res.send('ok, cargado')
    },

    
    productCart: (req, res) => {
        res.render('productCart', { cssStyle: "carrito-whislist", productos: getProductsFromDB() });
    },
    whisList: (req, res) => {
        res.render('productWhisList', { cssStyle: "carrito-whislist", productos: getProductsFromDB() } );
    },
    
};

module.exports = userController;