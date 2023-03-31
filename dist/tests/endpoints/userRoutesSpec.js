"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token = jsonwebtoken_1.default.sign("test", process.env.TOKEN_SECRET);
dotenv_1.default.config();
const request = (0, supertest_1.default)(server_1.default);
describe('Users api: ', () => {
    it('/user should return status: 200', () => {
        const data = {
            first_name: 'Ahmed',
            last_name: 'Ali',
            user_name: 'test',
            user_password: 'password123',
        };
        request
            .post('user')
            .send(data)
            .expect(200);
    });
    it('/user should return all users', () => {
        request
            .get('users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect([
            {
                id: 1,
                first_name: 'Ahmed',
                last_name: 'Ali',
                user_name: 'test',
                user_password: 'password123',
            },
        ]);
    });
    it('/users/:id should show a user', () => {
        request
            .get('/user/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect({
            id: 1,
            first_name: 'Ahmed',
            last_name: 'Ali',
            user_name: 'test',
            user_password: 'password123',
        });
    });
});
