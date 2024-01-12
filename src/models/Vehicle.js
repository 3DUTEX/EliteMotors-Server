import { Sequelize, Model, DataTypes } from 'sequelize';

import config from '../config/database';
import Image from './Image';

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
      validate: {
        isFloat: {
          msg: 'price should a float type',
        },
      },
    },
    qtd_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'stock quantity should a int type',
        },
      },
    },
    idUser: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'idUser should a int type',
        },
      },
    },
  },
  {
    sequelize,
    tableName: 'Vehicles',
    timestamps: false, // Remove os campos createdAt/updatedAt inclusos por padrão
  },
);

Vehicle.hasMany(Image, {
  foreignKey: 'vehicleID',
  as: 'images',
});
