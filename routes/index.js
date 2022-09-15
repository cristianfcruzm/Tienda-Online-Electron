const express = require('express');


const productosRoute = require('./productosRoutes');
const usersRoute = require('./usersRoutes');
const categoriasRoutes = require('./categoriasRoutes');
const homeRoutes = require('./homeRoutes');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/productos', productosRoute);
  router.use('/users', usersRoute);
  router.use('/categorias', categoriasRoutes);
  router.use('/home', homeRoutes);
}

module.exports = routerApi;
