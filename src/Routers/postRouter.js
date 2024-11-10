import express from 'express';
import upload from '../config/multerConfig.js';
import CreatePost from '../Controllers/PostController.js';
import { GetAllPost, DeleteById, updatePost } from '../Controllers/PostController.js';
import { FindPostById } from '../services/PostService.js';
import { validate } from '../validation/ZodValidate.js';
import { zodPostschema } from '../validation/ZosPostSchema.js';
import { isAuthenticated } from '../Middlewears/Authentication.js';

const PostRouter = express.Router();

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post with an image
 *     responses:
 *       200:
 *         description: Post created successfully
 */
PostRouter.post('/', isAuthenticated, upload.single('image'), validate(zodPostschema), CreatePost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve a list of all posts
 *     responses:
 *       200:
 *         description: A list of posts
 */
PostRouter.get('/', isAuthenticated, GetAllPost);

/**
 * @swagger
 * /posts/findOne/{id}:
 *   get:
 *     summary: Find a post by ID
 *     description: Retrieve a single post by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Post found
 */
PostRouter.get('/findOne/:id', FindPostById);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     description: Delete a post by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 */
PostRouter.delete('/:id', isAuthenticated, DeleteById);

/**
 * @swagger
 * /posts/update/{id}:
 *   put:
 *     summary: Update a post by ID
 *     description: Update a post by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to update
 *     responses:
 *       200:
 *         description: Post updated successfully
 */
PostRouter.put('/update/:id', upload.single('image'), validate(zodPostschema), updatePost);

export default PostRouter;
