const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
  res.json({
    menubar: {
      about: 'about',
      contactenos: 'contactenos',
      producto: 'producto',
      carrito: 'carrito',
    },
  });
});

module.exports = router;
