const { body } = require('express-validator');
const db = require("../database/models");

module.exports = [ 

  body('contrasenia').isStrongPassword({ minLength: 5, minUppercase: 1, minLowercase: 4, minSymbols: 1, minNumbers: 1 }).withMessage('La contraseña no puede estar vacia'),
  body('nombre').notEmpty().withMessage('El nombre no puede estar vacio').isAlpha().withMessage('El nombre debe estar formado por letras'),
  body('email').notEmpty().withMessage('Indicá un email'),
  body('email').custom(async value => {
    const existingUser = await db.User.findAll({where: { email: value }});
    console.log(existingUser.notEmpty)
    if (existingUser.notEmpty) {
      throw new Error('Ya existe un usuario registrado con ese correo electronico');
    }
  })

]