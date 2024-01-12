import { Sequelize, Model, DataTypes } from 'sequelize';

import Vehicle from './Vehicle';
import config from '../config/database';

const sequelize = new Sequelize(config); // Conexão

export default class Image extends Model {
}

// Schema
Image.init(
  {
    storageID: {
      type: DataTypes.TEXT,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'storageID cannot be empty',
        },
      },
    },
    url: {
      type: DataTypes.TEXT,
      defaultValue: '',
      validate: {
        min: {
          args: 0,
          msg: 'url cannot be empty',
        },
      },
    },
    vehicleID: {
      type: DataTypes.INTEGER,
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

Image.belongsTo(Vehicle, {
  foreignKey: 'id',
});
