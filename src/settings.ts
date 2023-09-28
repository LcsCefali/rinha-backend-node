import 'dotenv/config'

export const NODE_ENV = process.env.NODE_ENV ?? 'production';
export const DATABASE_CLIENT = process.env.DATABASE_CLIENT ?? 'pg';
export const DATABASE_URL = process.env.DATABASE_URL ?? 'postgresql://postgres:mysecretpassword@localhost:5432/postgres';
export const PORT = Number(process.env.PORT) ?? 3000;
export const ADDRESS = process.env.ADDRESS ?? undefined;
export const API_INSTANCE = process.env.API_INSTANCE ?? 'api1';
export const CLUSTER_WORKERS = Number(process.env.CLUSTER_WORKERS ?? 5);
export const LOG_LEVEL = process.env.LOG_LEVEL ?? 'info';