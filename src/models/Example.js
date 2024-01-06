import { Sequelize, Model, DataTypes } from 'sequelize';

import config from '../config/database';

const sequelize = new Sequelize(config); // Conexão

export default class Example extends Model {
}

// Schema
Example.init(
  {
    name: {
      type: DataTypes.TEXT,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 30],
          msg: 'O nome precisa conter entre 3 a 30 caracteres',
        },
      },
    },
    email: {
      type: DataTypes.TEXT,
      defaultValue: '',
      validate: {
        isEmail: {
          msg: 'E-mail inválido',
        },
      },
    },
    password: {
      type: DataTypes.VIRTUAL,
      defaultValue: '',
      validate: {
        len: {
          args: [0, 60],
          msg: 'A senha deve conter no máximo 60 caracteres',
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
    tableName: 'Example',
    timestamps: false, // Remove os campos createdAt/updatedAt inclusos por padrão
  },
);
