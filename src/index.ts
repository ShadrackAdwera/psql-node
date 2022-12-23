import * as dotenv from 'dotenv';

import { app } from './app';
import { pgPool } from './pool';

dotenv.config();

if (!process.env.DATABASE_NAME) {
  throw new Error('Database name must be defined');
}
if (!process.env.DATABASE_PASSWORD) {
  throw new Error('Database password must be defined');
}
if (!process.env.DATABASE_USER) {
  throw new Error('Database user must be defined');
}
if (!process.env.DATABASE_HOST) {
  throw new Error('Database host must be defined');
}

const startUp = async () => {
  try {
    await pgPool.connect({
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      port: 5432,
    });
    app.listen(5000, () => {
      console.log('Connected to PORT: 5000');
    });
  } catch (error) {
    console.log(error);
  }
};

startUp();
