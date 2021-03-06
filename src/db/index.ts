import { Sequelize } from 'sequelize';
import { getConnURIWithDatabaseName } from './credentials';
import { getConfig } from '@config';

export const database = new Sequelize(getConnURIWithDatabaseName(), {
  dialect: 'postgres',
  logging: getConfig().database.sqlLog,
  ssl: getConfig().database.ssl,
  dialectOptions: {
    ssl: getConfig().database.ssl
  }
});
