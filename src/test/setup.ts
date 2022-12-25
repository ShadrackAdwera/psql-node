import * as dotenv from 'dotenv';

import { pgPool } from '../pool';

dotenv.config();

jest.setTimeout(3000000);
beforeAll(async () => {
  return pgPool.connect({
    database: process.env.TEST_DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    port: 5432,
  });
});

beforeEach(async () => {
  await pgPool.query(`DELETE FROM users`);
});

afterAll(async () => {
  return pgPool.close();
});
