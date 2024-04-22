import 'reflect-metadata';
import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { User } from '../entity/user.entity';

dotenv.config();

const { DB_HOST, DB_USERNAME, DB_DATABASE, NODE_ENV, DB_URL } = process.env;

export const AppDataSource = new DataSource({
  type: 'mysql',
  url: DB_URL,
  host: DB_HOST,
  port: 3306,
  username: DB_USERNAME,
  password: '',
  database: DB_DATABASE,
  entities: [User],
  migrations: [__dirname + '../migration/*.ts'],
  synchronize: true,
  // synchronize: NODE_ENV === 'dev' ? true : false,
});
