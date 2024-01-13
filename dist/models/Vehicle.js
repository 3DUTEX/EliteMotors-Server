"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Image = require('./Image'); var _Image2 = _interopRequireDefault(_Image);

const sequelize = new (0, _sequelize.Sequelize)(_database2.default); // Conexão

 class Vehicle extends _sequelize.Model {
} exports.default = Vehicle;

// Schema
Vehicle.init(
  {
    name: {
      type: _sequelize.DataTypes.TEXT,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 40],
          msg: 'The name must contain between 3 and 40 characters',
        },
      },
    },
    brand: {
      type: _sequelize.DataTypes.TEXT,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 40],
          msg: 'The brand must contain between 3 and 40 characters',
        },
      },
    },
    model: {
      type: _sequelize.DataTypes.TEXT,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 40],
          msg: 'The model must contain between 3 and 40 characters',
        },
      },
    },
    price: {
      type: _sequelize.DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        isFloat: {
          msg: 'price should a float type',
        },
      },
    },
    qtd_stock: {
      type: _sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'stock quantity should a int type',
        },
      },
    },
    idUser: {
      type: _sequelize.DataTypes.INTEGER,
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

Vehicle.hasMany(_Image2.default, {
  foreignKey: 'vehicleID',
  as: 'images',
});
