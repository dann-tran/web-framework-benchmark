import config from 'config'

interface ServerConfig {
  port: number
}

interface LoggingConfig {
  level: string
}

interface DbConfig {
  host: string
  port: number
  database: string
  username: string
  password: string
}

export const SERVER_CONFIG = config.get<ServerConfig>('server')
export const LOGGING_CONFIG = config.get<LoggingConfig>('logging')
export const DB_CONFIG = config.get<DbConfig>('db')