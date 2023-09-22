import { knex as database, Knex } from 'knex'
import { env } from './settings'

const isPostgres = env.DATABASE_CLIENT === 'pg'
const connection = isPostgres
  ? env.DATABASE_URL
  : {
      filename: env.DATABASE_URL,
    }

export const databaseConfig: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },
}

export const knex = database(databaseConfig);

export const PeopleDatabase = <T = any>() => {
  return knex<T>('people');
}

