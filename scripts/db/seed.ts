import 'module-alias/register';

import Seeds from '@db/seeds/index';
import { loadEnvVars } from '@config/initializers/envVars';

async function seed() {
  loadEnvVars();

  console.log('Running seeds');

  try {
    let i = 0;
    for (; i < Seeds.length; i++) {
      await Seeds[i]();
    }
    console.log(`Run ${i} seed(s) successfully!`);
  } catch (err) {
    console.error(err);
  }

  process.exit();
}

seed();
