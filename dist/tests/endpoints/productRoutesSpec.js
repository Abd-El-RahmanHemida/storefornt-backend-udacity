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
describe('products api: ', () => {
    it('/product should return status: 200', () => {
        const data = {
            name: "I'm a mobile, You can't buy me",
            price: 5000
        };
        request
            .post('/product')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(200);
    });
    it('/product should return all products', () => {
        request
            .get('/product')
            .expect(200)
            .expect([
            {
                name: "I'm a mobile, You can't buy me",
                price: 5000
            },
        ]);
    });
    it('/product/:id should show a product', () => {
        request
            .get('/product/1')
            .expect(200)
            .expect({
            name: "I'm a mobile, You can't buy me",
            price: 5000
        });
    });
});
