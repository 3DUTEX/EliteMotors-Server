"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const sequelize = new (0, _sequelize.Sequelize)(_database2.default); // Conexão

 class Image extends _sequelize.Model {
} exports.default = Image;

// Schema
Image.init(
  {
    storageID: {
      type: _sequelize.DataTypes.TEXT,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'storageID cannot be empty',
        },
      },
    },
    url: {
      type: _sequelize.DataTypes.TEXT,
      defaultValue: '',
      validate: {
        min: {
          args: 0,
          msg: 'url cannot be empty',
        },
      },
    },
    vehicleID: {
      type: _sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: { msg: 'vehicleID must be of type int' },
      },
    },
  },
  {
    sequelize,
    tableName: 'Images',
    timestamps: false, // Remove os campos createdAt/updatedAt inclusos por padrão
  },
);
