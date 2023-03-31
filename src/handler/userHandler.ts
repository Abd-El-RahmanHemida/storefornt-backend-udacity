import { User, UserData } from "../model/usersData";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()
const store = new UserData();

const index = async (req: Request, res: Response) => {
  
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
  
  const users = await store.index();
  res.json(users);
} catch (err) {
  res.json(`Could not get users Error: ${err}`)
}

};
const show = async (req: Request, res: Response) => {
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
  
  const user = await store.show(req.params.id);
  res.json(user);
} catch (err) {
  res.json(`Could not get user id= ${req.params.id} Error: ${err}`)
}

};
const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    user_name: req.body.username,
    user_password: req.body.userpassword,
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET!);
    res.json(token)
  } catch (err) {
    res.status(400);
    res.json(err as string + user);
  }
};
const authenticate = async (req: Request, res: Response) => {
  const user =  {
    username: req.body.username,
    password: req.body.password,
  }
  try {
      const u = await store.authenticate(user.username, user.password)
      var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET!);
      res.json(token)
  } catch(error) {
      res.status(401)
      res.json({ error })
  }
}
const userRoutes = (app: express.Application) => {
  app.get("/user", index);
  app.get("/user/:id", show);
  app.post("/user", create);
};

export default userRoutes;
