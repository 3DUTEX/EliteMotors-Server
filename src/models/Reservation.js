import { Sequelize, Model, DataTypes } from 'sequelize';

import config from '../config/database';

const sequelize = new Sequelize(config); // Conexão

export default class Reservation extends Model {
}

// Schema
Reservation.init(
  {
    vehicleID: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'vehicleID cannot be empty',
        },
        isInt: {
          msg: 'vehicleID must be type integer',
        },
      },
    },
    userID: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'userID cannot be empty',
        },
        isInt: {
          msg: 'userID must be type integer',
        },
      },
    },
    visitDate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'visitDate cannot be empty',
        },
        isDate: {
          msg: 'visitDate must be type date',
        },
      },
    },
    createdBy: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'visitDate cannot be empty',
        },
        isDate: {
          msg: 'visitDate must be type date',
        },
      },
    },
  },
  {
    sequelize,
    tableName: 'Reservations',
    timestamps: false, // Remove os campos createdAt/updatedAt inclusos por padrão
  },
);
