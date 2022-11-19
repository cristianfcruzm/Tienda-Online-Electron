'use strict';
const { OrderSchema, ORDERS_TABLE } = require('../models/order.model');
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDERS_TABLE, OrderSchema);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDERS_TABLE);
  },
};
