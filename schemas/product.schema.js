const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15).messages({
  'string.base': `" nombre "debe ser un tipo de 'texto'`,
  'string.empty': `"nombre "no puede ser un campo vacío`,
  'string.min': `"nombre" debe tener una longitud mínima de {#limit}`,
  'string.max': `"nombre" debe tener una longitud máxima de {#limit}`
});
const price = Joi.number().integer().min(10).messages({
  'number.base': `" price "debe ser un tipo de 'Numerico'`,
  'number.integer': `"price "no puede tener decimales`,
  'number.min': `"nombre" debe tener un valor mínimo de {#limit}`
});
const description = Joi.string().min(10).messages({
  'string.base': `" nombre "debe ser un tipo de 'texto'`,
  'string.empty': `"nombre "no puede ser un campo vacío`,
  'string.min': `"nombre" debe tener una longitud mínima de {#limit}`
});

const image = Joi.string().uri().messages({
  'string.base': `" image "debe ser un tipo de 'texto'`,
  'string.uri': `" image "debe ser una url Valida 'http://example.com'`
});
const categoryId = Joi.number().integer();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const price_min = Joi.number().integer().messages({
  'number.base': `" price "debe ser un tipo de 'Numerico'`,
  'number.integer': `"price "no puede tener decimales`
});
const price_max = Joi.number().integer().messages({
  'number.base': `" price "debe ser un tipo de 'Numerico'`,
  'number.integer': `"price "no puede tener decimales`
});

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min',{
    is: Joi.number().integer(),
    then: Joi.required()
  })
});


module.exports = {createProductSchema,updateProductSchema, getProductSchema,queryProductSchema};
