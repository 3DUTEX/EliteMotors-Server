import { Sequelize, Model, DataTypes } from 'sequelize';

import config from '../config/database';

const sequelize = new Sequelize(config); // Conexão

export default class Vehicle extends Model {
}

// Schema
Vehicle.init(
  {
    name: {
      type: DataTypes.TEXT,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 40],
          msg: 'The name must contain between 3 and 40 characters',
        },
      },
    },
    brand: {
      type: DataTypes.TEXT,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 40],
          msg: 'The brand must contain between 3 and 40 characters',
        },
      },
    },
    model: {
      type: DataTypes.TEXT,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 40],
          msg: 'The model must contain between 3 and 40 characters',
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    qtd_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    idUser: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'Vehicles',
    timestamps: false, // Remove os campos createdAt/updatedAt inclusos por padrão
  },
);
