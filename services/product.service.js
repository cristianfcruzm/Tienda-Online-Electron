const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.product(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.business(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }
  async find(query) {
    //paginación con parametros dinamicos
    const options = {
      include: ['category'],
      where: {}
    };
    //variables de Query que pueden venir en params
    const limit = query.limit;
    const offset = query.offset;
    const price = query.price;
    const price_min = query.price_min;
    const price_max = query.price_max;
    if (limit && offset){
      options.limit = Number(limit);
      options.offset = Number(offset);
    }
    if(price){
      options.where.price = price;
    }
    if (price_min && price_max){
      options.where.price ={
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      }
    }
    const products = await models.Product.findAll(options);
    return products;
  }
  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }
  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound('product notFound');
    } else {
      const product = this.products[index];
      this.products[index] = {
        ...product,
        ...changes,
      };
    }
    return this.products[index];
  }
  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Producto no existe');
    } else {
      this.products.splice(index, 1);
      return { id };
    }
  }
}

module.exports = ProductService;
