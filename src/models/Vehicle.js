import { Sequelize, Model, DataTypes } from 'sequelize';

import config from '../config/database';

const sequelize = new Sequelize(config); // Conexão

export default class Vehicle extends Model {
}

// Schema
Vehicle.init(
  {
    name: {
    },
    brand: {
    },
    model: {
    },
    price: {
      type: Sequelize.FLOAT,
    },
    qtd_stock: {
      type: Sequelize.INTEGER,
    },
    idUser: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'Vehicles',
    timestamps: false, // Remove os campos createdAt/updatedAt inclusos por padrão
  },
);
