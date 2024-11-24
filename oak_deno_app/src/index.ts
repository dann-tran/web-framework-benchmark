import * as log from "@std/log"
import { Application } from "@oak/oak/application";
import { SERVER_CONFIG } from "./app-config.ts";
import { setupLogging } from "./logging.ts";
import { router } from "./router.ts";


await setupLogging()

const logger = log.getLogger()

const app = new Application<{id: string}>({logErrors: false})
  .use(async (ctx, next) => {
    ctx.state.id = ctx.request.headers.get('X-Request-Id') || crypto.randomUUID()
    await next()
  })
  .use(async (ctx, next) => {
    logger.info(`${ctx.state.id} HTTP ${ctx.request.method} ${ctx.request.url}`)
    try {
      await next()
    } finally {
      logger.info(`${ctx.state.id} HTTP ${ctx.response.status}`)
    }
  })
  .use(router.routes())
  .use(router.allowedMethods())

app.addEventListener('listen', evt => {
  logger.info(`Server listening on port ${evt.port}`)
})
app.addEventListener('error', evt => {
  logger.error(`Error: ${evt.error.stack || evt.error}`)
})

app.listen({ port: SERVER_CONFIG.port })