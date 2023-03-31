import client from "../datebase";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS!;

export type User = {
  id?: number | string;
  first_name: string;
  last_name: string;
  user_name: string;
  user_password: string;
};

export class UserData {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get users ${error}`);
    }
  }
  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot get users ${error}`);
    }
  }
  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (first_name, last_name,user_name, user_password) VALUES ($1, $2, $3, $4)  RETURNING *";
      const hash = bcrypt.hashSync(
        user.user_password + pepper,
        parseInt(saltRounds)
      );
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.user_name,
        hash,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot create user ${error}`);
    }
  }
  async authenticate(
    userName: string,
    userPassword: string
  ): Promise<boolean | null> {
    try {
      const conn = await client.connect();
      const sql = "SELECT user_password FROM users WHERE user_name = ($1)";
      const result = await conn.query(sql, [userName]);
      conn.release();
      if (result.rows.length) {
        const user_password = result.rows[0];
        if (bcrypt.compareSync(userPassword + pepper, user_password)) {
          return true;
        }
      }
  
    } catch (err) {
      return null
    }
   
    return null;
  }
  async delete(userId:string|number):Promise<void>{
    try {
       const conn = await client.connect();
    const sql = "DELETE FROM users WHERE id=($1)";
    const result = await conn.query(sql, [userId]);
    conn.release();
    } catch (err) {
      throw new Error(`cannot delete user ${err}`);
    }
   
  }
}
