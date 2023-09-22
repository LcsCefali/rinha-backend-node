import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']).default('pg'),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3000),
})

export const env = envSchema.parse(process.env)
