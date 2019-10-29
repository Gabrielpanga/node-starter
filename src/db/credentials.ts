import { loadEnvVars } from '@config/initializers/envVars';

export function getDatabaseConfig() {
  const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_SQLLOG } = process.env;
  const base = {
    user: DB_USER || 'postgres',
    pass: DB_PASSWORD || 'postgres',
    host: DB_HOST,
    databaseName: DB_DATABASE || 'node_graphql',
    sqlLog: DB_SQLLOG === 'true'
  };

  const development = {
    ...base
  };

  const test = {
    ...base,
    databaseName: DB_DATABASE || `${base.databaseName}_test`
  };

  const production = {
    ...base
  };

  const { NODE_ENV } = process.env;

  if (NODE_ENV == 'production') {
    return production;
  } else if (NODE_ENV == 'test') {
    return test;
  }

  return development;
}

export function getConnURIWithDatabaseName() {
  loadEnvVars();

  const { databaseName } = getDatabaseConfig();

  return `${getConnURI()}/${databaseName}`;
}

export function getConnURI() {
  loadEnvVars();

  const { user, pass, host } = getDatabaseConfig();

  return `postgres://${user}:${pass}@${host}:5432`;
}
