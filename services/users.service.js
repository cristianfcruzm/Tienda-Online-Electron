const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class UserService {
  constructor() {
    this.users = [];
    this.generateUsers();
  }

  async generateUsers() {
    this.users.push({
      idusuario: faker.datatype.uuid(),
      name: 'administrador',
      password: 'Administrador.1',
      isBlock: faker.datatype.boolean(),
    });
  }
  async create(data) {
    const newUser = {
      idusuario: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
   };

  async find() {
    return this.users;
  };

  async findOne(id){
    const user = this.users.find(user => user.idusuario === id);
    if(!user){
      throw boom.notFound('User notFound');
    }
    if(user.isBlock){
      throw boom.locked('User Bloqueado');
    }
    return user;
  };

  async update(id,changes) {
    const index = this.users.findIndex((user) => user.idusuario === id);

    if (index === -1) {
      throw boom.notFound('User notFound');
    } else {
      const user = this.users[index];
      this.users[index] = {
        ...user,
        ...changes,
      };
    }
    return this.users[index];
  };

  async delete(id) {
    const index = this.users.findIndex((user) => user.idusuario === id);
    if (index === -1) {
      throw boom.notFound('User notFound');
    } else {
      this.users.splice(index, 1);
      return { id };
    } };
}

module.exports = UserService
