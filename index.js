import express from 'express';
import upload from './src/config/multerConfig.js';
import CreatePost from './src/Controllers/PostController.js';
import connect from './src/config/mongodb.js';
import Postrouter from './src/Routers/postRouter.js';
import ApiRouter from './src/Routers/ApiRouter.js';
import { isAuthenticated } from './src/Middlewears/Authentication.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import { options } from './src/utils/SwaggerOption.js';
const app = express();
const port = 3001;

connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',ApiRouter)
const swaggerdoc = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerdoc));// Connect to MongoDB
app.get('/ping', isAuthenticated, (req, res) => {
    return res.send({ message: 'pong' });
});


app.listen(port, () => {
    console.log('Server is running at port', port);
});
