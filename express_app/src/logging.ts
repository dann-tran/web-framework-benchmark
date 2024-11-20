import { Request, Response, NextFunction } from 'express'
import winston from 'winston'
import { LOGGING_CONFIG } from './app-config'

const { combine, timestamp, json } = winston.format

export const logger = winston.createLogger({
  level: LOGGING_CONFIG.level,
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({filename: LOGGING_CONFIG.filename})
  ]
})

export function logRequest(req: Request, _res: Response, next: NextFunction) {
  logger.info(`${req.id} HTTP ${req.method} ${req.path}`)
  next()
}

export function logResponseStatus(req: Request, res: Response, next: NextFunction) {
  res.on('finish', () => {
    logger.info(`${req.id} HTTP ${res.statusCode} ${res.statusMessage}`)
  })
  next()
}

export function logErrors(err: Error, req: Request, _: Response, next: NextFunction) {
  const baseMsg = `${req.id} ${err.name} ${err.message}`
  const msg = err.stack ? `${baseMsg}\nStack trace: ${err.stack}` : baseMsg
  logger.error(msg)
  next(err)
}