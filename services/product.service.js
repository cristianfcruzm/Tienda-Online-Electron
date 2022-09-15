const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

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
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 2000);
    });
  }
  async findOne(id) {
    const producto = this.products.find((item) => item.id === id);
    if (!producto) {
      throw boom.notFound('product notFound');
    }
    if (producto.isBlock){
      throw boom.conflict('product is block');
    }
    return producto;
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
