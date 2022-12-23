import { Pool, PoolConfig } from 'pg';

class PgPool {
  _pool?: Pool;

  connect(options: PoolConfig) {
    this._pool = new Pool(options);
  }
}

export const pgPool = new PgPool();
