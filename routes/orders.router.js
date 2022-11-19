const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const OrderService = require('../services/order.service');
const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  addItemSchema
} = require('../schemas/orders.shema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const order = await service.find();
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',validatorHandler(getOrderSchema, 'params'), async(req, res, next) => {
  try {
    const id = req.params.id;
    const order = await service.findOne(id);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  };
});

router.post('/',validatorHandler(createOrderSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newOrder = await service.create(body);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

router.patch('/:idOrder',validatorHandler(getOrderSchema, 'params'),
validatorHandler(updateOrderSchema, 'body'),
async (req, res, next) => {
  try {
    const id = req.params.idOrder;
    const body = req.body;
    const order = await service.update(id, body);
    res.status(202).json(order);
  } catch (error) {
    next(error);
  }
});

//Servicio de add item
router.post('/add-item',validatorHandler(addItemSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newItem = await service.addItem(body);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
