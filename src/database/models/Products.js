module.exports = (sequelize, dataTypes) => {
   const alias = "Products"
   const cols ={
    id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
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
        type: dataTypes.VARCHAR
    },
    id:{
        type: dataTypes.
    },
   }


    const products = sequelize.define(alias,cols,config)
    return products

}

