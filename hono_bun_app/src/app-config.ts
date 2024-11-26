import { z } from 'zod'
import config from 'config'

const ServerConfigSchema = z.object({
  port: z.number()
})

const LoggingConfigSchema = z.object({
  level: z.enum(['info', 'debug', 'error']),
  filename: z.string()
})

const DbConfigSchema = z.object({
  host: z.string(),
  port: z.number(),
  database: z.string(),
  username: z.string(),
  password: z.string()
})

const ConfigSchema = z.object({
  server: ServerConfigSchema,
  logging: LoggingConfigSchema,
  db: DbConfigSchema
})

export const {
  server: SERVER_CONFIG,
  logging: LOGGING_CONFIG,
  db: DB_CONFIG
} = ConfigSchema.parse(config)