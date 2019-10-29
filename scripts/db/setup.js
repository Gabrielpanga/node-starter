"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const pg_1 = require("pg");
const credentials_1 = require("@db/credentials");
const envVars_1 = require("@config/initializers/envVars");
async function createDatabase() {
    envVars_1.loadEnvVars();
    const { databaseName } = credentials_1.getDatabaseConfig();
    const pool = new pg_1.Pool({
        connectionString: `${credentials_1.getConnURI()}/postgres`
    });
    console.log(`Creating database ${databaseName}`);
    const result = await pool.query(`SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${databaseName}');`);
    if (result.rowCount === 0) {
        try {
            await pool.query(`CREATE DATABASE ${databaseName}`);
        }
        catch (err) {
            console.log('There was an error while creating database', err);
        }
    }
    else {
        console.log('Database already exists.');
    }
}
exports.createDatabase = createDatabase;
createDatabase();
//# sourceMappingURL=setup.js.map