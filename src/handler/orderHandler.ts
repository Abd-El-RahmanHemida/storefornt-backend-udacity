import { Order, OrderData } from "../model/orderData";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

const store = new OrderData();

const create = async (req: Request, res: Response) => {
  const order: Order = {
    status: req.body.status,
    user_id: req.body.user_id,
  }

   // use token 
   try {
    const authorizationHeader = req.headers.authorization!
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET!)
} catch(err) {
    res.status(401)
    res.json(`Access denied, invalid token, Error is : ${err}`)
    return
}

  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const currentOrderByUser = async (req: Request, res: Response) => {
   // use token 
   try {
    const authorizationHeader = req.headers.authorization!
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET!)
} catch(err) {
    res.status(401)
    res.json(`Access denied, invalid token, Error is : ${err}`)
    return
}

try {
    const order = await store.currentOrderByUser(req.params.id);
    res.json(order);
} catch (err) {
    res.json(`cannot get order by user_id=${req.params.id} Error:${err}`);
}

};


const addProduct = async (req: Request, res: Response) => {

  const orderId: number = parseInt(req.params.id);
  const productId: number = parseInt(req.body.productId);
  const quantity: number = parseInt(req.body.quantity);


 // use token 
 try {
  const authorizationHeader = req.headers.authorization!
  const token = authorizationHeader.split(' ')[1]
  jwt.verify(token, process.env.TOKEN_SECRET!)
} catch(err) {
  res.status(401)
  res.json(`Access denied, invalid token, Error is : ${err}`)
  return
}


try {
    const order = await store.addProduct(orderId, productId, quantity);
  res.json(order);
} catch (err) {
  res.json(`cannot add product  product id=${productId} Error:${err}`);
}

};


const orderRoutes = (app: express.Application) => {
  app.get("/order/:userId", currentOrderByUser);
  app.post("/orders/:id/products", addProduct);
  app.post("/order", create);
};

export default orderRoutes;
