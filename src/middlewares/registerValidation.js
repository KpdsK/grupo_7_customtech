const { body } = require('express-validator');
const db = require("../database/models");

module.exports = [ 

  body('contrasenia').exists().isStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minSymbols: 1, minNumbers: 1 }).withMessage('La contraseña debe contener letras en Mayuscula y minuscula, al menos un numero y un caracter especial.'),
  body('nombre').exists().notEmpty().withMessage('El nombre no puede estar vacio').isAlpha().withMessage('El nombre debe estar formado por letras'),
  body('email').exists().notEmpty().isEmail().withMessage('Indicá un email').custom(async value => {
    const existingUser = await db.User.findAll({where: { email: value }});
    console.log(existingUser.notEmpty)
    if (existingUser.notEmpty) {
      throw new Error('Ya existe un usuario registrado con ese correo electronico');
    }
  })
  
]