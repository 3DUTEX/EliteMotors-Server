import { Sequelize, Model } from 'sequelize';

import config from '../config/database';

const sequelize = new Sequelize(config); // Conexão

export default class Example extends Model {
}

// Schema
Example.init(
  {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
  },
  {
    sequelize,
    tableName: 'Users',
    timestamps: false, // Remove os campos createdAt/updatedAt inclusos por padrão
  },
);
