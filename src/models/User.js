import { Sequelize, Model, DataTypes } from 'sequelize';
import { hash } from 'bcryptjs';

import Reservation from './Reservation';
import config from '../config/database';
import Vehicle from './Vehicle';

const sequelize = new Sequelize(config); // Conexão

export default class User extends Model {
}

// Schema
User.init(
  {
    name: {
      type: DataTypes.TEXT,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 30],
          msg: 'The name must contain between 3 and 30 characters',
        },
      },
    },
    email: {
      type: DataTypes.TEXT,
      defaultValue: '',
      validate: {
        isEmail: {
          msg: 'Invalid e-mail',
        },
      },
    },
    password: {
      type: DataTypes.VIRTUAL,
      defaultValue: '',
      validate: {
        len: {
          args: [0, 60],
          msg: 'The password must contain a maximum of 60 characters',
        },
      },
    },
    password_hash: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    level_access: {
      type: DataTypes.TEXT,
      defaultValue: 'Cliente',
    },
    isGoogleAccount: {
      type: DataTypes.BOOLEAN,
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
  const passwordHash = await hash(user.password, 8);
  user.password_hash = passwordHash;
});

Vehicle.belongsTo(User, {
  foreignKey: 'idUser',
  as: 'createdBy',
});

User.hasMany(Reservation, {
  foreignKey: 'userID',
});
