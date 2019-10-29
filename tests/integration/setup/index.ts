import 'module-alias/register';

import { clearDB } from './clearDB';

beforeEach(() => {
  return clearDB();
});
