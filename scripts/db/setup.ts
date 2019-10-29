import 'module-alias/register';

import { Pool } from 'pg';

import { getConnURI, getDatabaseConfig } from '@db/credentials';
import { loadEnvVars } from '@config/initializers/envVars';

export async function createDatabase() {
  loadEnvVars();

  const { databaseName } = getDatabaseConfig();

  const pool = new Pool({
    connectionString: `${getConnURI()}/postgres`
  });

  console.log(`Creating database ${databaseName}`);

  const result = await pool.query(
    `SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${databaseName}');`
  );

  if (result.rowCount === 0) {
    try {
      await pool.query(`CREATE DATABASE ${databaseName}`);
    } catch (err) {
      console.log('There was an error while creating database', err);
    }
  } else {
    console.log('Database already exists.');
  }
}

createDatabase();
