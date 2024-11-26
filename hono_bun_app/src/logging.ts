import * as winston from 'winston'
import { LOGGING_CONFIG } from './app-config'

const { combine, timestamp, json } = winston.format

export const winstonLogger = winston.createLogger({
  level: LOGGING_CONFIG.level,
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({filename: LOGGING_CONFIG.filename})
  ]
})

export function honoLoggerPrintFunction(message: string, ...rest: string[]) {
  winstonLogger.info(message, ...rest)
}