module.exports = (sequelize, dataTypes) => {
  const alias = "Bills"
  const cols ={
   id:{
    type: dataTypes.BIGINT(10).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
   },
   total:{
       type: dataTypes.INTEGER,
       allowNull: false
   },
   fecha:{
       type: dataTypes.DATE
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
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
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