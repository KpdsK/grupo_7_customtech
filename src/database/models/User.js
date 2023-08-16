module.exports = (sequelize, dataTypes) => {
  const alias = "User"
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
   email:{
       type: dataTypes.STRING,
       allowNull: false
   },
   password:{
       type: dataTypes.STRING,
       allowNull: false
   },
   erased:{
       type: dataTypes.BOOLEAN,
       allowNull: false
   },
   image:{
        type: dataTypes.STRING,
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
    tableName: 'user',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
   }
   const User = sequelize.define(alias, cols, config)


  
  
  User.associate = (models)=> {
    User.belongsTo(models.Profile,{
        as: 'profile',
        foreignKey:'id_profile',

    })

    User.hasMany(models.Bills, {
      as: 'bills',
      foreignKey:'id_user'
    })
}

  return User
}