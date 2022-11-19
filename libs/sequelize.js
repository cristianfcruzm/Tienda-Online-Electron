const { Sequelize } = require('sequelize');
const {config} = require('../config/config');
const setupModels = require('../db/models/index');

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)

//Conexión por medio de POSTGRES
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//Conexión por medio de MYSQL
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = {
  dialect: 'mysql',
  logging: config.isProd ? false : true,
}
if (config.isProd){
  options.ssl= {
    rejectUnauthorized: false
  }
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);


module.exports = sequelize;
