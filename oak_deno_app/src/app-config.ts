import { z } from 'zod'
import * as path from "jsr:@std/path"
import * as yaml from "jsr:@std/yaml"


const ServerConfigSchema = z.object({
  port: z.number()
})

const LoggingConfigSchema = z.object({
  level: z.enum(['INFO', 'DEBUG', 'ERROR']),
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

const configStr = await Deno.readTextFile(
  path.join(Deno.cwd(), "config/default.yaml")
)

export const {
  server: SERVER_CONFIG,
  logging: LOGGING_CONFIG,
  db: DB_CONFIG
} = ConfigSchema.parse(
  yaml.parse(configStr)
)
