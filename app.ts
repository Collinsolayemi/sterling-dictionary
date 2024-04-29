import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import authRouter from './src/route/user.route';
import dictionaryRouter from './src/route/dictionary.route';
import { AppDataSource } from './src/datasource/datasource';
import errorMiddleware from './src/middleware/error/error.middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerDefinition } from './swagger';
import path from 'path';

const app = express();

dotenv.config({ path: './.env' });

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://s-deliveries.vercel.app/'],
    credentials: true,
  })
);

// Swagger Setup
const routeFolderPath = path.join(__dirname, '..', 'src', 'route');
const options = {
  swaggerDefinition,
  apis: [path.join(routeFolderPath, '*.ts')],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/v1', authRouter);
app.use('/api/v1', dictionaryRouter);

app.use(errorMiddleware);

// Initialize Data Source and Start Server
AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));

// Global Type Declaration for Express Request
//to add user to the req body globally
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
