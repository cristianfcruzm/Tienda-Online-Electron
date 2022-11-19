const Joi = require('joi');

const id = Joi.string().messages({
  'string.base': `" idusuario "debe ser un tipo de 'texto'`,
  'string.guid': `"idusuario " debe ser un ID valido`,
});
const email = Joi.string().email().messages({
  'string.base': `" nombre "debe ser un tipo de 'texto'`,
  'string.empty': `"nombre "no puede ser un campo vacío`,
});
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
  'string.pattern.base': `" password "debe contener al menos una minuscula, una mayuscula y un numero, entre 3 y 30 caracteres`
});

const role = Joi.string().min(5).messages({
  'any.required': `"role " es obligatorio`
});
// const isBlock = Joi.boolean().messages({
//   'boolean.base': `" isBlock "debe ser un tipo de 'Boolean true o false'`
// });

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role
}).messages({
  'object.unknown': `" las llaves requeridas son 'name, password, role'`
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  role: role,
}).messages({
  'object.unknown': `" las llaves permitidas son 'name, price, image, role'`
});

const getUserSchema = Joi.object({
  id: id.required(),
});


module.exports = {createUserSchema,updateUserSchema, getUserSchema};



