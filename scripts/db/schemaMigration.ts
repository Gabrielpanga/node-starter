import 'module-alias/register';

import { getMigrationsConfig, runCommand } from './migrationRunner';

const TYPE = 'schema';

async function processSchemaMigration() {
  const umzug = getMigrationsConfig(TYPE);

  const cmd = process.argv[2].trim();

  console.log(`${cmd.toUpperCase()} BEGIN FOR SCHEMA MIGRATIONS`);

  await runCommand(umzug, cmd, TYPE);
}

processSchemaMigration();
