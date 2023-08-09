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
  Category.associate= (models)=>{
    Category.hasMany(models.Products,
    {
        as:"products",
        foreignKey:"id_category",
    })}

  return user
}