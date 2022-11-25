const Joi = require('joi');

const email = Joi.string().email().messages({
  'string.base': `" nombre "debe ser un tipo de 'texto'`,
  'string.empty': `"nombre "no puede ser un campo vacío`,
});
const newPassword = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
  'string.pattern.base': `" password "debe contener al menos una minuscula, una mayuscula y un numero, entre 3 y 30 caracteres`
});
const token = Joi.string().messages({
  'string.base': `" idusuario "debe ser un tipo de 'texto'`,
  'string.guid': `"idusuario " debe ser un ID valido`,
});

const recoverySchema = Joi.object({
  email: email.required(),
});

const changeSchema = Joi.object({
  newPassword: newPassword.required(),
  token: token.required(),

});


module.exports = {recoverySchema, changeSchema};
