const { body } = require('express-validator');

module.exports = [ // SIEMPRE HAY QUE PONER UN WITHMESSAGE()

  body('contrasenia').isStrongPassword({ minLength: 5, minUppercase: 1, minLowercase: 4, minSymbols: 1, minNumbers: 3 }).withMessage('La contraseña no puede estar vacia'),
  body('email').notEmpty().withMessage('Indicá un email')

]