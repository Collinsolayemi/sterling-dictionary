import 'reflect-metadata';
import { DataSource, getMetadataArgsStorage } from 'typeorm';

import * as dotenv from 'dotenv';
import { User } from '../entity/user.entity';

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'sterling-dictionary',
  entities: [User],
  migrations: [__dirname + '../migration/*.ts'],
  synchronize: true,
  // synchronize: NODE_ENV === 'dev' ? true : false,
});
