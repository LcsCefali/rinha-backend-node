import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']).default('pg'),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3000),
  ADDRESS: z.string().default('0.0.0.0'),
  API_INSTANCE: z.string().optional(),
  CLUSTER_WORKERS: z.coerce.number().default(5)
})

export const env = envSchema.parse(process.env)
