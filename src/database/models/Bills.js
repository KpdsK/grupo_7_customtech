module.exports = (sequelize, dataTypes) => {
  const alias = "Bills"
  const cols ={
   id:{
       type: dataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
   },
   total:{
       type: dataTypes.INTEGER,
       allowNull: false
   },
   fecha:{
       type: dataTypes.DATE
   },
   id_user: {
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
    tableName: 'bills',
    timestamps: false
   }



  const Bills = sequelize.define(alias, cols, config)
  Bills.associate = (models)=>{
    
    Bills.belongsToMany(models.Products,{
        through:'BillsProducts',
        foreignKey:'id_bills',
        otherKey:'id_products'
    })

    Bills.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'id_user'
    })
  }


  return Bills

  
}