import express from 'express';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import authRouter from './src/route/user.route';

import { AppDataSource } from './src/datasource/datasource';
import errorMiddleware from './src/middleware/error/error.middleware';
dotenv.config({ path: './.env' });

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'server is running',
  });
});
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
