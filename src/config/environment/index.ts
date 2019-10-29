import { applyBaseConfig } from './base';
import { applyDevelopmentConfig } from './development';
import { applyProductionConfig } from './production';
import { applyTestConfig } from './test';

export function applyEnvironmentConfig() {
  const { NODE_ENV } = process.env;

  applyBaseConfig();
  if (NODE_ENV === 'production') {
    applyProductionConfig();
  } else if (NODE_ENV === 'test') {
    applyTestConfig();
  } else {
    applyDevelopmentConfig();
  }
}
