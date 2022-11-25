const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {
    this.users = [];
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });
    delete newUser.dataValues.password;
    return newUser;
   };

  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;
  };

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email }
    });
    return rta;
  };

  async findOne(id){
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User notFound');
    }
    // if(user.isBlock){
    //   throw boom.locked('User Bloqueado');
    // }
    return user;
  };

  async update(id,changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  };

  async delete(id) {
    const user = await this.findOne(id);
      await user.destroy();
      return { id };
};
};

module.exports = UserService
