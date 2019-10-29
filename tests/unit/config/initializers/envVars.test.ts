import { loadEnvVars } from '@config/initializers/envVars';

describe('#loadEnvVars', () => {
  it('loads the DB_DATABASE variable', () => {
    expect(process.env.DB_DATABASE).toBeFalsy();
    loadEnvVars();
    expect(process.env.DB_DATABASE).toBeTruthy();
  });
});
