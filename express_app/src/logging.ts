import winston from 'winston'
import expressWinston from 'express-winston'
import { LOGGING_CONFIG } from './app-config'

const { combine, timestamp, printf } = winston.format

export const logger = winston.createLogger({
  level: LOGGING_CONFIG.level,
  format: combine(timestamp(), printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
  transports: [
    new winston.transports.File({ filename: LOGGING_CONFIG.file })
  ]
})

export const loggerMiddleware = expressWinston.logger({
  winstonInstance: logger
})

export const errorLoggerMiddleware = expressWinston.errorLogger({
  winstonInstance: logger
})