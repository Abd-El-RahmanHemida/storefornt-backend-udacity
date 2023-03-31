"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersData_1 = require("../model/usersData");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new usersData_1.UserData();
const index = async (req, res) => {
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
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.json(`Could not get users Error: ${err}`);
    }
};
const show = async (req, res) => {
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
        const user = await store.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.json(`Could not get user id= ${req.params.id} Error: ${err}`);
    }
};
const create = async (req, res) => {
    const user = {
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        user_name: req.body.username,
        user_password: req.body.userpassword,
    };
    try {
        const newUser = await store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err + user);
    }
};
const authenticate = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const u = await store.authenticate(user.username, user.password);
        var token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};
const userRoutes = (app) => {
    app.get("/user", index);
    app.get("/user/:id", show);
    app.post("/user", create);
};
exports.default = userRoutes;
