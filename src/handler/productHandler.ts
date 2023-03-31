import { Product, ProductData } from "../model/productsData";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

const store = new ProductData();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
  res.json(products);
  } catch (err) {
    res.json(`Could not get products. Error: ${err}`)
  }
  
};


const show = async (req: Request, res: Response) => {
 try {
   const product = await store.show(req.params.id);
  res.json(product);
 } catch (err) {
  res.json(`Could not get product id=${req.params.id} Error: ${err}`)
 }
 
};


const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
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

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const producRoutes = (app: express.Application) => {
  app.get("/product", index);
  app.get("/product/:id", show);
  app.post("/product", create);
};

export default producRoutes;
