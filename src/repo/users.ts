import { pgPool } from '../pool';
import { IUserData } from '../types';

class UserRepo {
  static async find(): Promise<IUserData[]> {
    const { rows } = await pgPool.query<IUserData>(`SELECT * FROM users;`);
    return rows;
  }

  static async findById(id: number): Promise<IUserData[]> {
    const { rows } = await pgPool.query<IUserData>(
      `SELECT * FROM users WHERE id = $1;`,
      [id]
    );
    return rows;
  }

  static async create() {}

  static async findAndUpdate() {}

  static async findAndDelete() {}
}

export { UserRepo };
