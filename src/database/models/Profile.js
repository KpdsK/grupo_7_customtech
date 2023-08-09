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
  Profile.associate= (models)=>{
    Profile.hasMany(models.User,
    {
        as:"userprofile",
        foreignKey:"id_profile",
    })}
  return profile
}