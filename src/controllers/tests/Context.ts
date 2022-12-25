import * as dotenv from 'dotenv';
import { randomBytes } from 'crypto';
import * as migrate from 'node-pg-migrate';
import format from 'pg-format';

import { pgPool } from '../../pool';

dotenv.config();

class Context {
  private roleName: string;
  constructor(roleName: string) {
    this.roleName = roleName; //make sure the random string starts with a character
    console.log({ thethisRoleName: this.roleName, constRoleName: roleName });
  }
  static async build() {
    // generate a random role name to connect to PG
    // connect to pg as usual
    const roleName = 'p' + randomBytes(4).toString('hex');
    await pgPool.connect({
      host: process.env.DATABASE_HOST,
      port: 5432,
      database: process.env.TEST_DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    });
    // create a new role with the name generated
    await pgPool.query(
      format(`CREATE ROLE %I WITH LOGIN PASSWORD %L`, roleName, roleName)
    );
    // create a schema with the same role name
    await pgPool.query(
      format('CREATE SCHEMA %I AUTHORIZATION %I', roleName, roleName)
    ); // creates a schema and authorizes the role to connect to it
    // SHOW search_path > $"user", public => user is given precedece

    // disconnect from pg entirely
    await pgPool.close();

    // run schema migrations for this new schema
    await migrate.default({
      schema: roleName,
      direction: 'up',
      log: () => {},
      noLock: true,
      dir: 'migrations',
      databaseUrl: {
        host: process.env.DATABASE_HOST,
        port: 5432,
        database: process.env.TEST_DATABASE_NAME,
        user: roleName,
        password: roleName,
      },
      migrationsTable: 'users',
    });
    // connect to PG with this new role
    await pgPool.connect({
      host: process.env.DATABASE_HOST,
      port: 5432,
      database: process.env.TEST_DATABASE_NAME,
      user: roleName,
      password: roleName,
    });

    return new Context(roleName);
  }

  async removeItems() {
    await pgPool.query(`DELETE FROM users`);
  }

  async close() {
    // disconnect from pg
    await pgPool.close();
    // reconnect as root
    await pgPool.connect({
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      port: 5432,
    });
    // delete role + schema created
    console.log(this.roleName);
    await pgPool.query(format(`DROP SCHEMA %I CASCADE;`, this.roleName));
    await pgPool.query(format(`DROP ROLE %I;`, this.roleName));
    // disconnect
    await pgPool.close();
  }
}

export { Context };
