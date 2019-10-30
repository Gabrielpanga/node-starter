import 'module-alias/register';

import { getMigrationsConfig, runCommand } from './migrationRunner';

const TYPE = 'data';

async function processDataMigration() {
  const umzug = getMigrationsConfig(TYPE);

  const cmd = process.argv[2].trim();

  console.log(`${cmd.toUpperCase()} BEGIN FOR DATA MIGRATIONS`);

  await runCommand(umzug, cmd, TYPE);
}

processDataMigration();
