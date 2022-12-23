import { QueryResult } from 'pg';
import { pgPool } from '../pool';
import { IUserData } from '../types';

class UserRepo {
  static async find(): Promise<IUserData[]> {
    const { rows } = await pgPool.query<IUserData>(`SELECT * FROM users;`);
    return rows;
  }

  static async findById(id: number): Promise<IUserData> {
    const { rows } = await pgPool.query<IUserData>(
      `SELECT * FROM users WHERE id = ${id};`
    );
    return rows[0];
  }

  static async create() {}

  static async findAndUpdate() {}

  static async findAndDelete() {}
}

export { UserRepo };
