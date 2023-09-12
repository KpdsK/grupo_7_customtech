const db = require("../../database/models");
const bcrypt = require("bcryptjs");
const User = db.User;

module.exports = {

    list: async (req,res) => {
        let response = {};
        try {
            const usuarios = await User.findAll()
            response.count = usuarios.length
            response.users = usuarios.map((usuario) => {
                return {
                    id: usuario.id,
                    name: usuario.name,
                    email: usuario.email,
                    detail: `api/users/${req.params.id}`
                }
            }) 
        } catch (e) {
            response.msg = "Hubo un error"
            return res.json(response)
        }
    },

    detail: async (req,res) => {
        let response = {};
        try {
            const findUser = await User.findByPk(req.params.id, {attributes: {exclude:["password", "profile"]}})
            response.meta = {
                status: 200,
                url: `api/users/${req.params.id}`
            }
            response.data = findUser;
            return res.json(response);
        } catch (error) {
            console.log ("Hubo un error:", error);
            response.meta = {
                status: 500,
                url: `api/users/${req.params.id}`
            };
            response.msg = `Oops! algo salió mal al querer buscar al usuario con ID: ${req.params.id}`
            return res.status(500).json(response);
        }
    }
}