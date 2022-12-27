import client from '../../config/db/db';
import { user } from '../../types/models/user';

class User {
  static async getUserByEmail(email: string): Promise<user | null> {
    try {
      const sql = 'SELECT * FROM users WHERE email = $1';
      const result = await client.query(sql, [email]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${email}. Error: ${err}`);
    }
  }
  static async createUser(user: user): Promise<user> {
    try {
      const sql =
        'INSERT INTO users (user_name, first_name, last_name, email, password, gender , nationality, birth_date, role, is_verified) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id,role';
      const result = await client.query(sql, [
        user.user_name,
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.gender,
        user.nationality,
        user.birth_date,
        user.role,
        user.is_verified,
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new user ${user.email}. Error: ${err}`);
    }
  }
}

export default User;
