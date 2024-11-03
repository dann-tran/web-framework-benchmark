import express, { NextFunction, Request, Response } from 'express'
import * as uuid from 'uuid'
import { SERVER_CONFIG } from './app-config';
import { errorLoggerMiddleware, logger, loggerMiddleware } from './logging';
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
app.use((req, _, next) => {
  logger.info(`${req.id} HTTP ${req.method} ${req.path}`)
  next()
})
app.use(loggerMiddleware)
app.use(router)
app.use(errorLoggerMiddleware)

app.listen(SERVER_CONFIG.port, () => {
  logger.info(`Server is running at http://localhost:${SERVER_CONFIG.port}`)
})