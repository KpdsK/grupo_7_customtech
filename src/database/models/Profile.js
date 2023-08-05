module.exports = (sequelize, dataTypes) => {
  const alias = "Profile"
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
  }

  const config = {
    tableName: 'profile',
    timestamps: false
   }

  const profile = sequelize.define(alias, cols, config)
  return profile
}