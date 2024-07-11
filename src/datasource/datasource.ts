import 'reflect-metadata';
import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { User } from '../entity/user.entity';
import { Dictionary } from '../entity/dictionary.entity';

dotenv.config();

const { DB_HOST, DB_USERNAME, DB_DATABASE, DB_URL, DB_PASSWORD, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: 'mysql',
  url: DB_URL,
  host: DB_HOST,
  port: 3306,
  username: DB_USERNAME,
  password: NODE_ENV === 'production' ? 'DB_PASSWORD' : '',
  database: DB_DATABASE,
  connectTimeout: 30000,
  entities: [User, Dictionary],
  migrations: [__dirname + '../migration/*.ts'],
  synchronize: NODE_ENV === 'production' ? false : true,
});
