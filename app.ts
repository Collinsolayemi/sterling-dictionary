import express from 'express';
import * as dotenv from 'dotenv';
import authRouter from './src/route/user.route';

import { AppDataSource } from './src/datasource/datasource';
import errorMiddleware from './src/middleware/error/error.middleware';
dotenv.config({ path: './.env' });
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { url } from 'inspector';

const app = express();

const port = process.env.PORT;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sample API',
      version: '1.0.0',
      description: 'A sample API with Swagger documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['dist/src/route/*.js'],
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', authRouter);

app.use(errorMiddleware);

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));

//to add user to the req body globally
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
