"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envVars_1 = require("@config/initializers/envVars");
function getDatabaseConfig() {
    const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_SQLLOG } = process.env;
    const base = {
        user: DB_USER || 'postgres',
        pass: DB_PASSWORD || 'postgres',
        host: DB_HOST,
        databaseName: DB_DATABASE || 'node_graphql',
        sqlLog: DB_SQLLOG === 'true'
    };
    const development = Object.assign({}, base);
    const test = Object.assign(Object.assign({}, base), { databaseName: DB_DATABASE || `${base.databaseName}_test` });
    const production = Object.assign({}, base);
    const { NODE_ENV } = process.env;
    if (NODE_ENV == 'production') {
        return production;
    }
    else if (NODE_ENV == 'test') {
        return test;
    }
    return development;
}
exports.getDatabaseConfig = getDatabaseConfig;
function getConnURIWithDatabaseName() {
    envVars_1.loadEnvVars();
    const { databaseName } = getDatabaseConfig();
    return `${getConnURI()}/${databaseName}`;
}
exports.getConnURIWithDatabaseName = getConnURIWithDatabaseName;
function getConnURI() {
    envVars_1.loadEnvVars();
    const { user, pass, host } = getDatabaseConfig();
    return `postgres://${user}:${pass}@${host}:5432`;
}
exports.getConnURI = getConnURI;
//# sourceMappingURL=credentials.js.map