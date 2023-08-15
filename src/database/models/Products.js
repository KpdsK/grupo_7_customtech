module.exports = (sequelize, dataTypes) => {
   const alias = "Products"
   const cols ={
    id:{
        type: dataTypes.BIGINT(10).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name:{
        type: dataTypes.STRING,
        allowNull: false
    },
    description:{
        type: dataTypes.STRING
    },
    price:{
        type: dataTypes.INTEGER
    },
    erased:{
        type: dataTypes.BOOLEAN
    },
    id_category: {
        type: dataTypes.INTEGER
    },
    release_date: {
        type: dataTypes.DATE
   },
   created_at: {
    type: dataTypes.DATE
    },
    updated_at: {
        type: dataTypes.DATE
    },
    deleted_at: {
        type: dataTypes.DATE
    }   
    
   }

   const config = {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
   }
   
    const Products = sequelize.define(alias,cols,config)

    Products.associate= (models)=>{
            Products.hasMany(models.ProductImage,
            {
                as:"product_image",
                foreignKey:"id_products",
            })

            Products.belongsTo(models.Category, {
                as: "category",
                foreignKey:'id_category'
           }) 

            Products.belongsToMany(models.Bills,{

                through:'BillsProducts',
                foreignKey:'id_products',
                otherKey:'id_bills'
            })}
    
    
    return Products


}

