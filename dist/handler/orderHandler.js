"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderData_1 = require("../model/orderData");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new orderData_1.OrderData();
const create = async (req, res) => {
    const order = {
        status: req.body.status,
        user_id: req.body.user_id,
    };
    // use token 
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json(`Access denied, invalid token, Error is : ${err}`);
        return;
    }
    try {
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const currentOrderByUser = async (req, res) => {
    // use token 
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json(`Access denied, invalid token, Error is : ${err}`);
        return;
    }
    try {
        const order = await store.currentOrderByUser(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.json(`cannot get order by user_id=${req.params.id} Error:${err}`);
    }
};
const addProduct = async (req, res) => {
    const orderId = parseInt(req.params.id);
    const productId = parseInt(req.body.productId);
    const quantity = parseInt(req.body.quantity);
    // use token 
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json(`Access denied, invalid token, Error is : ${err}`);
        return;
    }
    try {
        const order = await store.addProduct(orderId, productId, quantity);
        res.json(order);
    }
    catch (err) {
        res.json(`cannot add product  product id=${productId} Error:${err}`);
    }
};
const orderRoutes = (app) => {
    app.get("/order/:userId", currentOrderByUser);
    app.post("/orders/:id/products", addProduct);
    app.post("/order", create);
};
exports.default = orderRoutes;
