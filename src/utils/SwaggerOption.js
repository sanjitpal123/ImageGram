
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export const options = {
    definition: {
        openapi: '3.0.0', // Corrected here
        info: {
            title: 'Image gram API',
            version: '1.0.0',
            description: 'This is a simple CRUD API application made with Express and documented with Swagger'
        },
        servers: [
            {
                url: 'http://localhost:3001/api'
            }
        ]
    },
    apis: ['./src/Routers/*.js']
};
