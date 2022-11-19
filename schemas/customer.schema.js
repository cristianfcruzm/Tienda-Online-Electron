const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone =  Joi.string();
const userId = Joi.number().integer();
const email = Joi.string().email().messages({
  'string.base': `" nombre "debe ser un tipo de 'texto'`,
  'string.empty': `"nombre "no puede ser un campo vacío`,
});
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
  'string.pattern.base': `" password "debe contener al menos una minuscula, una mayuscula y un numero, entre 3 y 30 caracteres`
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required()
  })
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId
});

module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema };
