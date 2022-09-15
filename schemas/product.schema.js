const Joi = require('joi');

const idProducto = Joi.string().uuid().messages({
  'string.base': `" Idproducto "debe ser un tipo de 'texto'`,
  'string.uuid': `"Idproducto " debe ser un ID valido`,
  'string.guid': `"Idproducto " debe ser un ID valido`,
});
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

const image = Joi.string().uri().messages({
  'string.base': `" image "debe ser un tipo de 'texto'`,
  'string.uri': `" image "debe ser una url Valida 'http://example.com'`
});
const isBlock = Joi.boolean().messages({
  'boolean.base': `" isBlock "debe ser un tipo de 'Boolean true o false'`
});

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlock : isBlock.required(),
}).messages({
  'object.unknown': `" las llaves requeridas son 'name, price, image, isBlock'`
});;

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  isBlock : isBlock,
}).messages({
  'object.unknown': `" las llaves permitidas son 'name, price, image, isBlock'`
});

const getProductSchema = Joi.object({
  idProducto: idProducto.required(),
});


module.exports = {createProductSchema,updateProductSchema, getProductSchema};
