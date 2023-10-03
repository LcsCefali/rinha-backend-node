import { logger } from './helpers/log';
import { IRawQuery } from './interfaces/database';
import { DATABASE_URL } from './settings';

import pg from 'pg';

const pool = new pg.Pool({
  connectionString: DATABASE_URL,
  max: 300,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 10000
});

async function connect() {
  try {
    await pool.connect();
  } catch (err) {
    setTimeout(() => {
      connect();
      logger.error(`Connect database an error occured when connecting ${err} retrying connection on 3 secs`);
    }, 3000)
  }
}

export async function rawQuery<Result = any>(query: string, params?: any[]) {
  const { rows, rowCount } = await pool.query(query, params);

  const result = rows as Result[];

  return { result, rowCount } as IRawQuery<Result[]>;
}

pool.on('error', connect);
pool.once('connect', () => {
  return pool.query(`
  CREATE EXTENSION IF NOT EXISTS pg_trgm;

  CREATE OR REPLACE FUNCTION generate_searchable(_nome VARCHAR, _apelido VARCHAR, _stack JSON)
      RETURNS TEXT AS $$
      BEGIN
      RETURN _nome || _apelido || _stack;
      END;
  $$ LANGUAGE plpgsql IMMUTABLE;

  CREATE TABLE IF NOT EXISTS "people" (
    "id" uuid UNIQUE,
    "apelido" varchar(32),
    "nome" varchar(100),
    "stack" json,
    "nascimento" varchar(12),
    "searchable" text GENERATED ALWAYS AS (generate_searchable(nome, apelido, stack)) STORED
  );

  CREATE INDEX IF NOT EXISTS idx_people_searchable ON public.people USING gist (searchable public.gist_trgm_ops (siglen='64'));
  CREATE UNIQUE INDEX IF NOT EXISTS people_apelido_index ON public.people USING btree (apelido);
  CREATE UNIQUE INDEX IF NOT EXISTS people_id_index ON public.people USING btree (id);
  `)
});

connect();