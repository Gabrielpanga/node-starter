import * as Umzug from 'umzug';
import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { Sequelize } from 'sequelize';

import { getConfig } from '@config';
import { loadEnvVars } from '@config/initializers/envVars';
import { database } from '@db';

const capitalize = str =>
  str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

function logUmzugEvent(eventName: String) {
  return function(name: String) {
    console.log(`${name} ${eventName}`);
  };
}

function cmdReset(umzug: Umzug) {
  return umzug.down({ to: 0 });
}

function cmdMigrate(umzug: Umzug) {
  return umzug.up();
}

async function cmdMigrateNext(umzug: Umzug) {
  const result = await cmdStatus(umzug);
  if (result.pending.length === 0) {
    return Promise.reject(new Error('No pending migrations'));
  }
  const next = result.pending[0].name;
  return umzug.up({ to: next });
}

async function cmdResetPrev(umzug: Umzug) {
  const result = await cmdStatus(umzug);
  const { executed } = result;
  if (executed.length === 0) {
    return Promise.reject(new Error('Already at initial state'));
  }
  const prev = executed[executed.length - 1].name;
  return umzug.down({ to: prev });
}

function cmdHardReset() {
  const DB_NAME = getConfig().database.databaseName;
  const DB_USER = getConfig().database.user;

  return new Promise((resolve, reject) => {
    setImmediate(() => {
      try {
        console.log(`dropdb ${DB_NAME}`);
        child_process.spawnSync(`dropdb ${DB_NAME}`);
        console.log(`createdb ${DB_NAME} --username ${DB_USER}`);
        child_process.spawnSync(`createdb ${DB_NAME} --username ${DB_USER}`);
        resolve();
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  });
}

async function cmdStatus(umzug: Umzug) {
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

async function cmdCreateMigration(folder: string) {
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
    fs.writeFile(`${file}.up.sql`, '', () => {});
    fs.writeFile(`${file}.down.sql`, '', () => {});
  } else {
    fs.writeFile(`${file}.js`, '', () => {});
  }
}

export enum Command {
  RESET = 'reset',
  STATUS = 'status',
  UP = 'up',
  MIGRATE = 'migrate',
  NEXT = 'next',
  MIGRATE_NEXT = 'migrate-next',
  DOWN = 'down',
  CREATE = 'create',
  PREV = 'prev',
  RESET_PREV = 'reset-prev',
  RESET_HARD = 'reset-hard'
}

export function getMigrationsConfig(type: string) {
  const migrationsPath = path.join(
    __dirname,
    '../../../src/db/migrations/',
    type
  );

  loadEnvVars();
  const umzug = new Umzug({
    migrations: {
      path: migrationsPath,
      params: [database.getQueryInterface(), Sequelize],
      pattern: /\.(up.sql|js)$/,
      customResolver: path => {
        if (path.includes('.js')) {
          return require(path);
        }
        const downPath = path.replace('up', 'down');
        return {
          up: () => database.query(fs.readFileSync(path, 'utf-8')),
          down: () => database.query(fs.readFileSync(downPath, 'utf-8'))
        };
      }
    },
    storage: 'sequelize',
    storageOptions: {
      database,
      sequelize: database,
      tableName: `_Migrations${capitalize(type)}`
    }
  });

  umzug.on('migrating', logUmzugEvent('migrating'));
  umzug.on('migrated', logUmzugEvent('migrated'));
  umzug.on('reverting', logUmzugEvent('reverting'));
  umzug.on('reverted', logUmzugEvent('reverted'));

  return umzug;
}

export async function runCommand(umzug: Umzug, cmd: string, folder: string) {
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
  } catch (err) {
    const errorStr = `${cmd.toUpperCase()} ERROR`;
    console.log(errorStr);
    console.log('='.repeat(errorStr.length));
    console.log(err);
    console.log('='.repeat(errorStr.length));
  } finally {
    if (cmd !== Command.STATUS && cmd !== Command.RESET_HARD) {
      await cmdStatus(umzug);
    }
    process.exit(0);
  }
}
