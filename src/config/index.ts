import { initialize } from './initializers';
import { applyEnvironmentConfig } from './environment';
import { getDatabaseConfig } from '@db/credentials';

export function applyConfig() {
  initialize();
  applyEnvironmentConfig();
}

export function getConfig() {
  return {
    database: getDatabaseConfig()
  };
}
