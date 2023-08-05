module.exports = (sequelize, dataTypes) => {
  const alias = "BillsProducts"
  const cols ={
   id:{
       type: dataTypes.INTEGER,
       primaryKey: true,
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
    timestamps: false
   }

  const user = sequelize.define(alias, cols, config)
  return user
}