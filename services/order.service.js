const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { addItemSchema } = require('../schemas/orders.shema');

class OrderService {
  constructor() {
    this.orders = [];
  }
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }
  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    if (!order) {
      throw boom.notFound('Order notFound');
    }
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    if (!newItem) {
      throw boom.notFound('Item not found');
    }
    return newItem;
  }
}

module.exports = OrderService;
