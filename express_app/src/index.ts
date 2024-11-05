import express, { NextFunction, Request, Response } from 'express'
import * as uuid from 'uuid'
import { SERVER_CONFIG } from './app-config';
import logger from './logging';
import router from './router';


declare global {
  namespace Express {
    interface Request {
      id?: string
    }
  }
}

const app = express()

app.use((req, _, next) => {
  const id = req.get('X-Request-Id') || uuid.v4()
  req.id = id
  next()
})
app.use((req, res, next) => {
  logger.info(`${req.id} HTTP ${req.method} ${req.path}`)
  res.on('finish', () => {
    logger.info(`${req.id} HTTP ${res.statusCode} ${res.statusMessage}`)
  })
  next()
})
app.use(router)
app.use((err: Error, req: Request, _: Response, next: NextFunction) => {
  const baseMsg = `${req.id} ${err.name} ${err.message}`
  const msg = err.stack ? `${baseMsg}\nStack trace: ${err.stack}` : baseMsg
  logger.error(msg)
  next()
})


app.listen(SERVER_CONFIG.port, () => {
  logger.info(`Server is running at http://localhost:${SERVER_CONFIG.port}`)
})