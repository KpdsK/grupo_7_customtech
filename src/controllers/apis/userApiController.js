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

    getDataWishCart: async (req, res) => {
        let response = {};
        try {
            const products_data = await db.ProductCart.findAll({
                where: { id_user: req.params.id },
                attributes: ['id_product', 'amount'],
                exclude: ['created_at', 'updated_at'], raw: true
            }).then(cart => cart);

            const cart = await db.Product.findAll({
                where: { id: { [Op.in]: products_data.map(e => e.id_product) } },
                attributes: ['id', 'price'],
                exclude: ['created_at', 'updated_at'],
                raw: true
            }).then(cart => cart);

            let arr = (cart.map(item => {
                let ob = products_data.find((elm) => (elm.id_product === item.id));
                ob.price = item.price;
                return ob
            }));

            let total = arr.reduce((tot, e) => tot + e.amount * e.price, 0);
            let cantidad_cart = products_data.reduce((tot, e) => tot + e.amount, 0);
            const cart_data = { cantidad_cart: cantidad_cart, total_cart: total }
            const wish_data = await db.WishList.count({
                where: { id_user: req.params.id },
                exclude: ['created_at', 'updated_at'],
                raw: true
            }).then(wish => wish);

            response.data = { ...cart_data, wish_data: wish_data };
            return res.status(200).json(response);

        } catch (error) {
            console.log("Hubo un error:", error);
            response.msg = `Oops! algo salió mal`
            return res.status(500).json(response);
        }
    }
}