const express = require('express');
const UserService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createUserSchema,updateUserSchema, getUserSchema} = require('../schemas/users.shema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    //console.log('hola desde get');
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  };
// manejo de Liminit para traer los usuarios
  // const { limit, offset } = req.query;
  // if (limit && offset) {
  //   res.json({
  //     limit,
  //     offset,
  //   });
  // } else {
  //   res.send('No existen parametros');
  // }
});

router.get('/:id',validatorHandler(getUserSchema, 'params'), async(req, res, next) => {
  try {
    const id = req.params.id;
    const user = await service.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  };
});

// Recibir un nuevo parametro de usuario.
router.post('/',validatorHandler(createUserSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  };
});

//actualizar un parametro de usuario
router.patch('/:id',validatorHandler(getUserSchema, 'params'),
validatorHandler(updateUserSchema, 'body'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const user = await service.update(id, body);
    res.status(202).json(user);
  } catch (error) {
    next(error);
  }
});

//Eliminar un usuario
router.delete('/:id',validatorHandler(getUserSchema, 'params'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const respuesta = await service.delete(id);
    res.json(respuesta);
  } catch (error) {
    next(error);
  }

});


module.exports = router;
