"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderData = void 0;
const datebase_1 = __importDefault(require("../datebase"));
class OrderData {
    async create(order) {
        try {
            const conn = await datebase_1.default.connect();
            const sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2)  RETURNING *";
            const result = await conn.query(sql, [order.status, order.user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`cannot create order ${error}`);
        }
    }
    async currentOrderByUser(userId) {
        try {
            const conn = await datebase_1.default.connect();
            const sql = "SELECT * FROM orders WHERE user_id=($1)";
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot get orders ${err}`);
        }
    }
    async addProduct(quantity, orderId, productId) {
        try {
            const sql = "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
            const conn = await datebase_1.default.connect();
            const result = await conn.query(sql, [quantity, orderId, productId]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
        }
    }
    async deleteProduct(productId) {
        try {
            const conn = await datebase_1.default.connect();
            const sql = "DELETE FROM order_products WHERE id=($1)";
            const result = await conn.query(sql, [productId]);
            conn.release();
        }
        catch (err) {
            throw new Error(`cannot delete product ${err}`);
        }
    }
}
exports.OrderData = OrderData;
