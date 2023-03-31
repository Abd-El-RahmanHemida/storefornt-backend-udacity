"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductData = void 0;
const datebase_1 = __importDefault(require("../datebase"));
class ProductData {
    async index() {
        try {
            const conn = await datebase_1.default.connect();
            const sql = "SELECT * FROM products";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot get products ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await datebase_1.default.connect();
            const sql = "SELECT * FROM products WHERE id = ($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`cannot get users ${error}`);
        }
    }
    async create(product) {
        try {
            const conn = await datebase_1.default.connect();
            const sql = "INSERT INTO products (name, price) VALUES ($1, $2)  RETURNING *";
            const result = await conn.query(sql, [product.name, product.price]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`cannot create product ${error}`);
        }
    }
    async delete(productId) {
        try {
            const conn = await datebase_1.default.connect();
            const sql = "DELETE FROM products WHERE id=($1)";
            const result = await conn.query(sql, [productId]);
            conn.release();
        }
        catch (err) {
            throw new Error(`cannot delete product ${err}`);
        }
    }
}
exports.ProductData = ProductData;
