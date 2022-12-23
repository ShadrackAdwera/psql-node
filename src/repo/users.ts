import { QueryResult } from 'pg';
import { pgPool } from '../pool';
import { IUserData, IUser } from '../types';

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

  static async create({ username, bio }: IUser): Promise<IUserData[]> {
    const { rows } = await pgPool.query<IUserData>(
      `INSERT INTO users (username, bio) VALUES ($1,$2) RETURNING *;`,
      [username, bio]
    );
    return rows;
  }

  static async findAndUpdate(
    id: number,
    { username, bio }: IUser
  ): Promise<IUserData[]> {
    const { rows } = await pgPool.query(
      `UPDATE users SET username = $1, bio = $2 WHERE id = $3 RETURNING *;`,
      [username, bio, id]
    );
    return rows;
  }

  static async findAndDelete(id: number): Promise<QueryResult<any>> {
    return await pgPool.query(`DELETE FROM users WHERE id = $1;`, [id]);
  }
}

export { UserRepo };
