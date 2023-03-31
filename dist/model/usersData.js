"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserData = void 0;
const datebase_1 = __importDefault(require("../datebase"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class UserData {
    async index() {
        try {
            const conn = await datebase_1.default.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`cannot get users ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await datebase_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`cannot get users ${error}`);
        }
    }
    async create(user) {
        try {
            const conn = await datebase_1.default.connect();
            const sql = "INSERT INTO users (first_name, last_name,user_name, user_password) VALUES ($1, $2, $3, $4)  RETURNING *";
            const hash = bcrypt_1.default.hashSync(user.user_password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [
                user.first_name,
                user.last_name,
                user.user_name,
                hash,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`cannot create user ${error}`);
        }
    }
    async authenticate(userName, userPassword) {
        try {
            const conn = await datebase_1.default.connect();
            const sql = "SELECT user_password FROM users WHERE user_name = ($1)";
            const result = await conn.query(sql, [userName]);
            conn.release();
            if (result.rows.length) {
                const user_password = result.rows[0];
                if (bcrypt_1.default.compareSync(userPassword + pepper, user_password)) {
                    return true;
                }
            }
        }
        catch (err) {
            return null;
        }
        return null;
    }
    async delete(userId) {
        try {
            const conn = await datebase_1.default.connect();
            const sql = "DELETE FROM users WHERE id=($1)";
            const result = await conn.query(sql, [userId]);
            conn.release();
        }
        catch (err) {
            throw new Error(`cannot delete user ${err}`);
        }
    }
}
exports.UserData = UserData;
