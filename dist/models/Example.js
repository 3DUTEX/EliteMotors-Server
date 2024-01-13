"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const sequelize = new (0, _sequelize.Sequelize)(_database2.default); // Conexão

 class Example extends _sequelize.Model {
} exports.default = Example;

// Schema
Example.init(
  {
    firstName: _sequelize.Sequelize.STRING,
    lastName: _sequelize.Sequelize.STRING,
    email: _sequelize.Sequelize.STRING,
  },
  {
    sequelize,
    tableName: 'Example',
    timestamps: false, // Remove os campos createdAt/updatedAt inclusos por padrão
  },
);
