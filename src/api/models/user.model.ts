import client from '../../config/db/db';
import { user } from '../types/models/user';

class User {
  static async getUserByEmail(email: string): Promise<user | null> {
    try {
      const sql = 'SELECT * FROM users WHERE email = $1';
      const result = await client.query(sql, [email]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${email}.  ${err}`);
    }
  }
  static async getUserById(id: number): Promise<user | null> {
    try {
      const sql = 'SELECT * FROM users WHERE id = $1';
      const result = await client.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}.  ${err}`);
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
  static async verifyManager(id: number): Promise<user> {
    try {
      const sql =
        'UPDATE users SET is_verified = true WHERE id = $1 RETURNING id,role';
      const result = await client.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not verify user ${id}. ${err}`);
    }
  }
  static async getUnverifiedManagers(): Promise<user[]> {
    try {
      const sql =
        'SELECT id,user_name,email FROM users WHERE is_verified = false';
      const result = await client.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get unverified users. ${err}`);
    }
  }
  static async getAllUsers(): Promise<user[]> {
    try {
      const sql =
        "SELECT id,user_name,email,role FROM users WHERE role != 'admin'";
      const result = await client.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all users.  ${err}`);
    }
  }
  static async deleteUser(id: number): Promise<user> {
    try {
      const sql =
        "DELETE FROM users WHERE id = $1 AND role != 'admin' RETURNING id,role,email";
      const result = await client.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}.  ${err}`);
    }
  }
  static async updateUser(user: user): Promise<user> {
    try {
      const sql =
        'UPDATE users SET first_name = $1, last_name = $2, password = $3, gender = $4, nationality = $5, birth_date = $6 WHERE id = $7 RETURNING id,first_name,last_name,gender,nationality,birth_date';
      const result = await client.query(sql, [
        user.first_name,
        user.last_name,
        user.password,
        user.gender,
        user.nationality,
        user.birth_date,
        user.id,
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user ${user.id}.  ${err}`);
    }
  }
}

export default User;
