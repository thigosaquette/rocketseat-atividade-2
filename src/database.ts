import type { Knex } from 'knex';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';
import knex from 'knex';

dotenvConfig();

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite',
    connection: {
      filename: path.resolve(__dirname, '../db/app.db'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, '../db/migrations'),
    },
  },
  test: {
    client: 'sqlite',
    connection: {
      filename: path.resolve(__dirname, '../db/test.db'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, '../db/migrations'),
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, '../db/migrations'),
    },
  },
};

const environment = process.env.NODE_ENV || 'development';

export const knexInstance = knex(config[environment]);
export { knexInstance as knex };

