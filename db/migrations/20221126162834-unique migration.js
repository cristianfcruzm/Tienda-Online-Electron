'use strict';
const { Sequelize } = require('sequelize');
const { USER_TABLE } = require('./../models/user.model');
const { CUSTOMER_TABLE } = require('./../models/customer.model');
const { CATEGORY_TABLE } = require('./../models/category.model');
const { PRODUCT_TABLE } = require('./../models/product.model');
const { ORDER_TABLE } = require('./../models/order.model');
const { ORDER_PRODUCT_TABLE } = require('./../models/order-product.model');


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, {id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: { allowNull: false, type: DataTypes.STRING, unique: true },
    password: { allowNull: false, type: DataTypes.STRING },
    recoveryToken: {
      field: 'recovery_token',
      allowNull: true,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'customer',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'create_at',
      defaultValue: Sequelize.NOW,
    }});
    await queryInterface.createTable(CUSTOMER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name',
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      userId: {
        field:'user_id',
        allowNull:true,
        type:DataTypes.INTEGER,
        unique: true,
        references: {
          model:USER_TABLE,
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'
      }
    });
    await queryInterface.createTable(CATEGORY_TABLE,{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      }
    });
    await queryInterface.createTable(PRODUCT_TABLE,{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      categoryId: {
        field: 'category_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: CATEGORY_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
    await queryInterface.createTable(ORDER_TABLE,{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      customerId:{
        field: 'customer_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      }
    });
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      orderId:{
        field: 'order_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: ORDERS_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      productId:{
        field: 'product_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: PRODUCT_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  },
};
