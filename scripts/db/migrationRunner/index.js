"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Umzug = require("umzug");
const child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const sequelize_1 = require("sequelize");
const _config_1 = require("@config");
const envVars_1 = require("@config/initializers/envVars");
const _db_1 = require("@db");
const capitalize = str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
function logUmzugEvent(eventName) {
    return function (name) {
        console.log(`${name} ${eventName}`);
    };
}
function cmdReset(umzug) {
    return umzug.down({ to: 0 });
}
function cmdMigrate(umzug) {
    return umzug.up();
}
async function cmdMigrateNext(umzug) {
    const result = await cmdStatus(umzug);
    if (result.pending.length === 0) {
        return Promise.reject(new Error('No pending migrations'));
    }
    const next = result.pending[0].name;
    return umzug.up({ to: next });
}
async function cmdResetPrev(umzug) {
    const result = await cmdStatus(umzug);
    const { executed } = result;
    if (executed.length === 0) {
        return Promise.reject(new Error('Already at initial state'));
    }
    const prev = executed[executed.length - 1].name;
    return umzug.down({ to: prev });
}
function cmdHardReset() {
    const DB_NAME = _config_1.getConfig().database.databaseName;
    const DB_USER = _config_1.getConfig().database.user;
    return new Promise((resolve, reject) => {
        setImmediate(() => {
            try {
                console.log(`dropdb ${DB_NAME}`);
                child_process.spawnSync(`dropdb ${DB_NAME}`);
                console.log(`createdb ${DB_NAME} --username ${DB_USER}`);
                child_process.spawnSync(`createdb ${DB_NAME} --username ${DB_USER}`);
                resolve();
            }
            catch (e) {
                console.log(e);
                reject(e);
            }
        });
    });
}
async function cmdStatus(umzug) {
    const executed = await umzug.executed();
    const pending = await umzug.pending();
    const current = executed.length > 0 ? executed[0].file : '<NO_MIGRATIONS>';
    const status = {
        current: current,
        executed: executed.map(m => m.file),
        pending: pending.map(m => m.file)
    };
    console.log(JSON.stringify(status, null, 2));
    return { executed, pending };
}
async function cmdCreateMigration(folder) {
    const today = new Date();
    const day = today.getDate();
    const monthIndex = today.getMonth() + 1;
    const month = monthIndex < 10 ? `0${monthIndex}` : monthIndex;
    const year = today.getFullYear();
    const fullDate = `${year}${month}${day}`;
    const name = process.env.NAME;
    const type = process.env.TYPE || 'sql';
    const file = `./src/db/migrations/${folder}/${fullDate}.${name}`;
    if (type === 'sql') {
        fs.writeFile(`${file}.up.sql`, '', () => { });
        fs.writeFile(`${file}.down.sql`, '', () => { });
    }
    else {
        fs.writeFile(`${file}.js`, '', () => { });
    }
}
var Command;
(function (Command) {
    Command["RESET"] = "reset";
    Command["STATUS"] = "status";
    Command["UP"] = "up";
    Command["MIGRATE"] = "migrate";
    Command["NEXT"] = "next";
    Command["MIGRATE_NEXT"] = "migrate-next";
    Command["DOWN"] = "down";
    Command["CREATE"] = "create";
    Command["PREV"] = "prev";
    Command["RESET_PREV"] = "reset-prev";
    Command["RESET_HARD"] = "reset-hard";
})(Command = exports.Command || (exports.Command = {}));
function getMigrationsConfig(type) {
    const migrationsPath = path.join(__dirname, '../../../src/db/migrations/', type);
    envVars_1.loadEnvVars();
    const umzug = new Umzug({
        migrations: {
            path: migrationsPath,
            params: [_db_1.database.getQueryInterface(), sequelize_1.Sequelize],
            pattern: /\.(up.sql|js)$/,
            customResolver: path => {
                if (path.includes('.js')) {
                    return require(path);
                }
                const downPath = path.replace('up', 'down');
                return {
                    up: () => _db_1.database.query(fs.readFileSync(path, 'utf-8')),
                    down: () => _db_1.database.query(fs.readFileSync(downPath, 'utf-8'))
                };
            }
        },
        storage: 'sequelize',
        storageOptions: {
            database: _db_1.database,
            sequelize: _db_1.database,
            tableName: `_Migrations${capitalize(type)}`
        }
    });
    umzug.on('migrating', logUmzugEvent('migrating'));
    umzug.on('migrated', logUmzugEvent('migrated'));
    umzug.on('reverting', logUmzugEvent('reverting'));
    umzug.on('reverted', logUmzugEvent('reverted'));
    return umzug;
}
exports.getMigrationsConfig = getMigrationsConfig;
async function runCommand(umzug, cmd, folder) {
    let executedCmd;
    switch (cmd) {
        case Command.STATUS:
            executedCmd = cmdStatus(umzug);
            break;
        case Command.UP:
        case Command.MIGRATE:
            executedCmd = cmdMigrate(umzug);
            break;
        case Command.NEXT:
        case Command.MIGRATE_NEXT:
            executedCmd = cmdMigrateNext(umzug);
            break;
        case Command.DOWN:
        case Command.RESET:
            executedCmd = cmdReset(umzug);
            break;
        case Command.PREV:
        case Command.RESET_PREV:
            executedCmd = cmdResetPrev(umzug);
            break;
        case Command.RESET_HARD:
            executedCmd = cmdHardReset();
            break;
        case Command.CREATE:
            executedCmd = cmdCreateMigration(folder);
            break;
        default:
            console.log(`invalid cmd: ${cmd}`);
            process.exit(1);
    }
    try {
        await executedCmd;
        const doneStr = `${cmd.toUpperCase()} DONE`;
        console.log(doneStr);
        console.log('='.repeat(doneStr.length));
    }
    catch (err) {
        const errorStr = `${cmd.toUpperCase()} ERROR`;
        console.log(errorStr);
        console.log('='.repeat(errorStr.length));
        console.log(err);
        console.log('='.repeat(errorStr.length));
    }
    finally {
        if (cmd !== Command.STATUS && cmd !== Command.RESET_HARD) {
            await cmdStatus(umzug);
        }
        process.exit(0);
    }
}
exports.runCommand = runCommand;
//# sourceMappingURL=index.js.map