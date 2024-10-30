import config from 'config'

interface ServerConfig {
  port: number
}

interface LoggingConfig {
  level: string
  file: string
}

export const SERVER_CONFIG = config.get<ServerConfig>('server')
export const LOGGING_CONFIG = config.get<LoggingConfig>('logging')