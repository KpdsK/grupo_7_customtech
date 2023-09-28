module.exports = (sequelize, dataTypes) => {
    const alias = "WishList"
    const cols = {
        id_user: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        id_product: {
            type: dataTypes.BIGINT(10).UNSIGNED
        },

    }

    const config = {
        tableName: 'wishlist',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const WishList = sequelize.define(alias, cols, config)
    return WishList
}