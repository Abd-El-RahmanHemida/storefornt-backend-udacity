"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const token = jsonwebtoken_1.default.sign("test", process.env.TOKEN_SECRET);
const request = (0, supertest_1.default)(server_1.default);
describe('order api: ', () => {
    it('/order should return status: 200', () => {
        const data = {
            status: "active",
            user_id: 1
        };
        request
            .post('/order')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(200);
    });
    it('/order/:userId should return order by user id', () => {
        request
            .get('/order/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect({
            status: "active",
            user_id: 1
        });
    });
    it('/orders/:id/products should add product', () => {
        request
            .post('/orders/1/products')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
});
