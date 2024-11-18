import express, { NextFunction, Request, Response } from 'express'
import * as uuid from 'uuid'
import { SERVER_CONFIG } from './app-config';
import { logErrors, logger, logRequest, logResponseStatus } from './logging';
import router from './router';


declare global {
  namespace Express {
    interface Request {
      id?: string
    }
  }
}

function augmentRequestId(req: Request, _: Response, next: NextFunction) {
  const id = req.get('X-Request-Id') || uuid.v4()
  req.id = id
  next()
}

const app = express()

app.use(augmentRequestId)
app.use(logRequest)
app.use(logResponseStatus)
app.use(router)
app.use(logErrors)

app.listen(SERVER_CONFIG.port, () => {
  logger.info(`Server is running at http://localhost:${SERVER_CONFIG.port}`)
})