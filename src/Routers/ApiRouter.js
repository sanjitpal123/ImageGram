import express, { application } from 'express'
import Postrouter from './postRouter.js';
import userRouter from './userRouter.js';
const ApiRouter=express.Router();
ApiRouter.use('/posts',Postrouter)
ApiRouter.use('/users',userRouter)
export default ApiRouter