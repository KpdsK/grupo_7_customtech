// 1. Guardar al usuario en la DB. LISTO (create)
// 2. Buscar al usuario que se quiere loguear por su email. LISTO (findByField)
// 3. Buscar a un usuario por su id. LISTO (findByPk)
// 4. Editar la informacion de un usuario
// 5. Eliminiar a un usuario de la DB

const fs = require('fs');
const { Module } = require('module');

const User = {
    fileName: './src/database/users.json', //Archivo que hace referencia a nuestra DB

    getData: function() { // Este método es para convertir el DB de JSON a un array que se pueda iterar/trabajar en js
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8')); //JSON parse para transformar el JSON en array iterable en js
    },

    findAll: function() {
        return this.getData();
    }, 

    generateId: function() {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop(); // SACA EL ULTIMO ELEMENTO DEL ARRAY
        if(lastUser){
          return  lastUser.id + 1;
        }
        return 1;
    },

    findByPk: function(id) { // Pk: Primary Key
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id == id);
        return userFound;
    },

    findByField: function(field, text) { // trae el primero que encuentre del field (dato dentro del json) que le pido
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text); //user.email - user.id - user.nombre - etc
        return userFound;
    },

    create: function(userData){ // Recibe información del ususario y lo guarda en nuestro archivo JSON
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
        let finalUsers = allUsers.filter(oneUser => oneUser.id != id); // DEVUELVE LOS USUARIOS MENOS EL DEL ID QUE LE PASO
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    }

}

//console.log(User.findByField('email', 'celven4@paypal.com')); BUSCA EN EL FIELD QUE LE PIDO, EL TEXTO QUE LE PASO

module.exports = User
















// CRUD create, read, update and delete