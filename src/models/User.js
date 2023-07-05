// 1. Guardar al usuario en la DB. LISTO (create)
// 2. Buscar al usuario que se quiere loguear por su email. LISTO (findByField)
// 3. Buscar a un usuario por su id. LISTO (findByPk)
// 4. Editar la informacion de un usuario
// 5. Eliminiar a un usuario de la DB (delete)

const fs = require('fs');
const { Module } = require('module');

const User = {
    fileName: './src/database/users.json', 

    getData: function() { 
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    findAll: function() {
        return this.getData();
    }, 

    generateId: function() {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop(); 
        if(lastUser){
          return  lastUser.id + 1;
        }
        return 1;
    },

    findByPk: function(id) { 
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id == id);
        return userFound;
    },

    findByField: function(field, text) { 
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text); 
        return userFound;
    },

    create: function(userData){ 
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return true;
    },

    delete: function(id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id != id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    }

}

//console.log(User.findByField('email', 'celven4@paypal.com')); //PRUEBA

module.exports = User
















// CRUD create, read, update and delete