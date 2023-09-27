import { knex as database, Knex } from 'knex'
import { env } from './settings'
import { People } from './interfaces/people'
import { types } from 'pg';

const isPostgres = env.DATABASE_CLIENT === 'pg'
const connection = isPostgres
  ? env.DATABASE_URL
  : {
      filename: env.DATABASE_URL,
    }

const DATE_OID = 1082;
const parseDate = (value: string) => value;
types.setTypeParser(DATE_OID, parseDate);

export const databaseConfig: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },
  pool: { min: 0, max: 7 }
}

export const knex = database(databaseConfig);

export const PeopleDatabase = () => {
  return knex<People>('people');
}

