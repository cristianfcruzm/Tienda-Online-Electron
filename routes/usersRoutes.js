const express = require('express');
const UserService = require('../services/users.service');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
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

router.get('/:id', async(req, res, next) => {
  try {
    const id = req.params.id;
    const user = await service.findOne(id);
    const userId = user === undefined ? 'Sin Información' : user.idusuario;

    id === userId
      ? res.status(200).json(user)
      : res.status(404).json({ message: 'Invalid id user' });
  } catch (error) {
    next(error);
  };
});

// Recibir un nuevo parametro de usuario.
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  };
});

//actualizar un parametro de usuario
router.patch('/:id', async (req, res, next) => {
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
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const respuesta = await service.delete(id);
    res.json(respuesta);
  } catch (error) {
    next(error);
  }

});


module.exports = router;
