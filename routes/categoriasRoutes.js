const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    acero: 'acero',
    cubiertos: 'cubiertos',
    laminas: 'laminas',
    bandejas: 'bandejas',
  });
});

router.get('/:idCategoria/productos/:idProducto', (req, res) => {
  const { idProducto, idCategoria } = req.params;
  res.json({
    idCategoria,
    idProducto,
  });
});


module.exports = router;
