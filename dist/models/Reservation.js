"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const sequelize = new (0, _sequelize.Sequelize)(_database2.default); // Conexão

 class Reservation extends _sequelize.Model {
} exports.default = Reservation;

// Schema
Reservation.init(
  {
    vehicleID: {
      type: _sequelize.DataTypes.INTEGER,
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
      type: _sequelize.DataTypes.INTEGER,
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
      type: _sequelize.DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'visitDate cannot be empty',
        },
      },
    },
    createdBy: {
      type: _sequelize.DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'visitDate cannot be empty',
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
