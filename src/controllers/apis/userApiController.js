const db = require("../../database/models");
const bcrypt = require("bcryptjs");
const User = db.User;
const { Op } = require('sequelize')

module.exports = {

    list: async (req, res) => {
        let response = { data: {} };
        try {
            const usuarios = await User.findAll()

            response.data.count = usuarios.length
            response.data.users = usuarios.map((usuario) => {
                return {
                    id: usuario.id,
                    name: usuario.name,
                    email: usuario.email,
                    detail: `api/users/${usuario.id}`,
                    erased: usuario.erased,
                    image: usuario.image
                }
            })
            return res.json(response)

        } catch (e) {
            response.msg = "Hubo un error"
            return res.json(response)
        }
    },

    detail: async (req, res) => {
        let response = {};
        try {
            const findUser = await User.findByPk(req.params.id, { attributes: { exclude: ["created_at", "updated_at", "password", "profile"] } });

            response.meta = {
                status: 200,
                total: findUser.length,
                url: `api/users/${req.params.id}`
            };
            response.data = findUser;
            return res.json(response);

        } catch (error) {
            console.log("Hubo un error:", error);
            response.meta = {
                status: 500,
                total: null,
                url: `api/users/${req.params.id}`
            };
            response.msg = `Oops! algo salió mal al querer buscar al usuario con ID: ${req.params.id}`
            return res.status(500).json(response);
        }
    },

    getDataCard: async (req, res) => {
        console.log(req.params);
        let response = { data: {} };
        try {
            fetch("https://api.mercadopago.com/v1/payment_methods", {
            method: 'GET',
            headers: { "Authorization": "Bearer TEST-3065031137576519-092820-de8ad65e67111de3f83e2acc16e7ed31-95259625", "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => {console.log(response); return response.json()})
            .then(arrTarjetas => {
                console.log(typeof [...arrTarjetas]);
                console.log(typeof arrTarjetas)
                return arrTarjetas
                // [...arrTarjetas].find(card => {let regEx = card.settings.bin.pattern; !regEx ? req.params.pre_tarj.match(regEx) : false })
                // var regEx = /^(4|45462200|49603900|48508900|45175900|40806500|44611600|47801300|49259700|43306000|48941800|45178600)/
                // let result = text.match(regEx);
                // arrTarjetas.
                // recargarDatosCarrito(obj.data.total_cart, obj.data.cantidad_cart);
                // recargarDatosWish(obj.data.wish_data)
            }).then( obj => console.log(typeof obj)).catch(err => console.log(err));
            // response.data.count = usuarios.length
            // response.data.users = usuarios.map((usuario) => {
            //     return {
            //         id: usuario.id,
            //         name: usuario.name,
            //         email: usuario.email,
            //         detail: `api/users/${usuario.id}`,
            //         image: usuario.image
            //     }
            // })
            return res.status(200)

        } catch (e) {
            response.msg = "Hubo un error"
            return res.json(response)
        }
    }
}