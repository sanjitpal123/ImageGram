import express from 'express';
import { GetAllPost } from '../Controllers/PostController.js';
import { validate } from '../validation/ZodValidate.js';
import { SignUp } from '../Controllers/UserController.js';
import { signin } from '../Controllers/UserController.js';
import { zodSignup } from '../validation/ZodSingUpSchema.js';
import { ZodSingInSchema } from '../validation/ZodSingin.js';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve all the posts
 *     responses:
 *       200:
 *         description: All posts are fetched
 */
userRouter.get('/', GetAllPost);

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Sign up or create an account
 *     description: Create an account on Image Gram
 *     responses:
 *       200:
 *         description: User is created successfully
 */
userRouter.post('/signup', validate(zodSignup), SignUp);

/**
 * @swagger
 * /users/signin:
 *   post:
 *     summary: Sign in to an account
 *     description: Log in to Image Gram
 *     responses:
 *       200:
 *         description: User signed in successfully
 */
userRouter.post('/signin', validate(ZodSingInSchema), signin);

export default userRouter;
