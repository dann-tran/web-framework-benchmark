import winston from 'winston'
import { LOGGING_CONFIG } from './app-config'

const { combine, timestamp, printf } = winston.format

const logger = winston.createLogger({
  level: LOGGING_CONFIG.level,
  format: combine(timestamp(), printf(({ level, message, timestamp, meta }) => {
    const baseMessage = `${timestamp} ${level.toUpperCase()} ${message}`
    return meta && meta.stack ? `${baseMessage}\nStack trace: ${meta.stack}` : baseMessage
  })),
  transports: [
    new winston.transports.Console()
  ]
})

export default logger