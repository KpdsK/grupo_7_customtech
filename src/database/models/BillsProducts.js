module.exports = (sequelize, dataTypes) => {
  const alias = "BillsProducts"
  const cols ={
   id:{
    type: dataTypes.BIGINT(10).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
   },
   id_bills:{
       type: dataTypes.INTEGER,
       allowNull: false
   },
   id_products:{
       type: dataTypes.INTEGER
   },
   cantidad:{
       type: dataTypes.INTEGER
   },
   price:{
       type: dataTypes.INTEGER
   },
   
  }
  
  const config = {
    tableName: 'billsProducts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
   }

  const BillsProducts = sequelize.define(alias, cols, config)
  return BillsProducts
}