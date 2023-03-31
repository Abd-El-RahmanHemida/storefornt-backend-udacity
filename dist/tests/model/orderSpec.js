"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderData_1 = require("../../model/orderData");
const productsData_1 = require("../../model/productsData");
const usersData_1 = require("../../model/usersData");
const store = new orderData_1.OrderData();
const Userstore = new usersData_1.UserData();
const Productstore = new productsData_1.ProductData();
let userId;
let productId;
describe('Order Model', () => {
    beforeAll(async () => {
        const user = await Userstore.create({
            first_name: 'cat',
            last_name: 'lion',
            user_name: 'meow',
            user_password: 'meowmeow',
        });
        userId = user.id;
        const product = await Productstore.create({
            name: "car",
            price: 8000
        });
        productId = product.id;
    });
    it('should create a Order', async () => {
        const result = await store.create({ status: "active", user_id: userId });
        expect(result).toEqual({
            id: 1,
            status: "active",
            user_id: userId
        });
    });
    it('should return list of Orders by user\'s id', async () => {
        const result = await store.currentOrderByUser(userId);
        expect(result.length).toEqual(1);
    });
    it('should put a product in a order', async () => {
        const order = await store.currentOrderByUser(userId);
        const orderId = order[0].id;
        const result = await store.addProduct(5, orderId, productId);
        expect(result.quantity).toEqual(5);
        expect(result.order_id).toEqual(orderId);
        expect(result.product_id).toEqual(productId);
    });
    afterAll(async () => {
        await store.deleteProduct(productId);
        await Userstore.delete(userId);
        await Productstore.delete(productId);
    });
});
