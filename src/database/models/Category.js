module.exports = (sequelize, dataTypes) => {
  const alias = "Category"
  const cols ={
   id:{
       type: dataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
   },
   name:{
       type: dataTypes.STRING,
       allowNull: false
   }   
  }

  const config = {
    tableName: 'category',
    timestamps: false
   }

  const user = sequelize.define(alias, cols, config)
  return user
}