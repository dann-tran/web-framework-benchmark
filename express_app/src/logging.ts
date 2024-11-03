import winston from 'winston'
import expressWinston from 'express-winston'
import { LOGGING_CONFIG } from './app-config'

const { combine, timestamp, printf } = winston.format

export const logger = winston.createLogger({
  level: LOGGING_CONFIG.level,
  format: combine(timestamp(), printf(({ level, message, timestamp, meta }) => {
    const baseMessage = `${timestamp} [${level}] ${message}`
    return meta && meta.stack ? `${baseMessage}\nStack trace: ${meta.stack}` : baseMessage
  })),
  transports: [
    new winston.transports.File({ filename: LOGGING_CONFIG.file })
  ]
})

export const loggerMiddleware = expressWinston.logger({
  winstonInstance: logger,
  msg: (req, res) => `${req.id} HTTP ${res.statusCode} ${res.statusMessage}`
})

export const errorLoggerMiddleware = expressWinston.errorLogger({
  winstonInstance: logger
})