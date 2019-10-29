import * as dotenv from 'dotenv';

export function loadEnvVars() {
  if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' });
  } else {
    dotenv.config({ path: '.env' });
  }
}
