module.exports = (sequelize, dataTypes) => {
    const alias = "ProductCart"
    const cols = {
        id_user: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        id_product: {
            type: dataTypes.BIGINT(10).UNSIGNED
        },
        amount: {
            type: dataTypes.INTEGER.UNSIGNED
        },

    }

    const config = {
        tableName: 'product_cart',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const ProductCart = sequelize.define(alias, cols, config)
    return ProductCart
}