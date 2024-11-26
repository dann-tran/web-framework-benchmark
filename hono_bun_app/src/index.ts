import { Hono } from 'hono'
import { winstonLogger } from './logging'
import { HTTPException } from 'hono/http-exception'
import { InternalServerError } from './exceptions'
import { SERVER_CONFIG } from './app-config'
import { requestId, type RequestIdVariables } from 'hono/request-id'
import { router } from './router'

const app = new Hono<{
  Variables: RequestIdVariables
}>()
  .use(requestId())
  .use(async (c, next) => {
    winstonLogger.info(`${c.get('requestId')} HTTP ${c.req.method} ${c.req.path}`)
    await next()
    winstonLogger.info(`${c.get('requestId')} HTTP ${c.res.status}`)
  })
  .route('/', router)
  .onError((err, _) => {
    winstonLogger.error(`Error: ${err}\nStack trace: ${err.stack}`)
    return (err instanceof HTTPException ? err : new InternalServerError()).getResponse()
  })

winstonLogger.info(`Server is running on http://localhost:${SERVER_CONFIG.port}`)

export default {
  port: SERVER_CONFIG.port,
  fetch: app.fetch
}
