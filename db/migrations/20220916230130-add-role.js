'use strict';
const { USER_TABLE, UserSchema } = require('../models/user.model');

//migración para crear o modificar una tabla, para este caso agregar la columna de rol

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE,'role', UserSchema.role);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE,'role');
  }
};
