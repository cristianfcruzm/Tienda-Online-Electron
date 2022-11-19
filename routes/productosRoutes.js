const express = require('express');
const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

router.get('/',
validatorHandler(queryProductSchema, 'query'),
async (req, res, next) => {
  try {
    const productos = await service.find(req.query);
    res.json(productos);
  } catch (error) {
    next(error);
  }
});

router.get('/filter', (req, res) => {
  res.send('yo soy un filter');
});

// retormar un solo producto por id
router.get(
  '/:idProducto',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.idProducto;
      const producto = await service.findOne(id);
      const productoId =
        producto === undefined ? 'Sin Información' : producto.id;

      id === productoId
        ? res.status(200).json(producto)
        : res.status(404).json({ message: 'Invalid id product' });
    } catch (error) {
      next(error);
    }
  }
);

// Recibir un nuevo parametro de producto.
router.post('/',validatorHandler(createProductSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

//actualizar un parametro
router.patch('/:idProducto',validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async (req, res, next) => {
  try {
    const id = req.params.idProducto;
    const body = req.body;
    const product = await service.update(id, body);
    res.status(202).json(product);
  } catch (error) {
    next(error);
  }
});

//Eliminar un parametro
router.delete('/:idProducto',validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const id = req.params.idProducto;
    const respuesta = await service.delete(id);
    res.json(respuesta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
