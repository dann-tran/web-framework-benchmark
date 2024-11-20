import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { winstonLogger } from './logging.js'
import { HTTPException } from 'hono/http-exception'
import { InternalServerError } from './exceptions.js'
import { SERVER_CONFIG } from './app-config.js'
import { requestId, type RequestIdVariables } from 'hono/request-id'
import { router } from './router.js'

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

serve({
  fetch: app.fetch,
  port: SERVER_CONFIG.port
})
