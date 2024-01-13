"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _bcryptjs = require('bcryptjs');

var _Reservation = require('./Reservation'); var _Reservation2 = _interopRequireDefault(_Reservation);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Vehicle = require('./Vehicle'); var _Vehicle2 = _interopRequireDefault(_Vehicle);

const sequelize = new (0, _sequelize.Sequelize)(_database2.default); // Conexão

 class User extends _sequelize.Model {
} exports.default = User;

// Schema
User.init(
  {
    name: {
      type: _sequelize.DataTypes.TEXT,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 30],
          msg: 'The name must contain between 3 and 30 characters',
        },
      },
    },
    email: {
      type: _sequelize.DataTypes.TEXT,
      defaultValue: '',
      validate: {
        isEmail: {
          msg: 'Invalid e-mail',
        },
      },
    },
    password: {
      type: _sequelize.DataTypes.VIRTUAL,
      defaultValue: '',
      validate: {
        len: {
          args: [0, 60],
          msg: 'The password must contain a maximum of 60 characters',
        },
      },
    },
    password_hash: {
      type: _sequelize.DataTypes.TEXT,
      defaultValue: '',
    },
    level_access: {
      type: _sequelize.DataTypes.TEXT,
      defaultValue: 'Cliente',
    },
    isGoogleAccount: {
      type: _sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'Users',
    timestamps: false, // Remove os campos createdAt/updatedAt inclusos por padrão
  },
);

// Criando hash da senha antes de salvar no BD
User.beforeSave(async (user) => {
  if (!user.password) return;
  const passwordHash = await _bcryptjs.hash.call(void 0, user.password, 8);
  user.password_hash = passwordHash;
});

_Vehicle2.default.belongsTo(User, {
  foreignKey: 'idUser',
  as: 'createdBy',
});

User.hasMany(_Reservation2.default, {
  foreignKey: 'userID',
});
