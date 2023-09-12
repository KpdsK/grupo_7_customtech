const db = require("../../database/models");
const Product = db.Product;
const Category = db.Category;

module.exports = {

    list: async (req,res) => {
        let response = {};
        try { //alias de la asociación en el modelo
            const [productos, categorys] = await Promise.all([Product.findAll(), Category.findAll({include: [{association: categorys}]})]) //PONER NOMBRE DE ASOCIACIÓN
            response.count = productos.length
            response.countByCategory = {}

            productos.forEach( (categoria) => {
                response.countByCategory[categoria.name] = categoria.productos.length
            });

            response.productos = productos.map((product)=> {
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    category: product.id_category,
                    detail: `api/products/${product.id}`
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
            const findProduct = await Product.findByPk(req.params.id, {include: [{association:"categorys"}]})
            response.meta = {
                status: 200,
                url: `/api/products/${req.params.id}`
            }
            response.data = findProduct;
            response.data.image = `/public/images/${findProduct.image}`

            return res.json(response);

        } catch (error) {
            console.log ("Hubo un error al buscar el producto:", error);
            response.meta = {
                status: 500,
                url: `/api/products/${req.params.id}`
            };
            response.msg = `Oops! algo salió mal al querer buscar al producto con ID: ${req.params.id}`
            return res.status(500).json(response);
        }
    }
}