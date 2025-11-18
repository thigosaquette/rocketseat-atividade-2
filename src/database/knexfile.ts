import type { Knex } from 'knex';
import { config } from 'dotenv';
import path from 'path';

config();

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'daily_diet',
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
      extension: 'ts',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
      extension: 'ts',
    },
  },
};

export default knexConfig;

