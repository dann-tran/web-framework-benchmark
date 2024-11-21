import * as log from "@std/log"
import { Application } from "@oak/oak/application";
import { SERVER_CONFIG } from "./app-config.ts";
import { setupLogging } from "./logging.ts";
import { router } from "./router.ts";


await setupLogging()

const logger = log.getLogger()

const app = new Application<{id: string}>()
  .use(async (ctx, next) => {
    ctx.state.id = ctx.request.headers.get('X-Request-Id') || crypto.randomUUID()
    await next()
  })
  .use(async (ctx, next) => {
    logger.info(`${ctx.state.id} HTTP ${ctx.request.method} ${ctx.request.url}`)
    await next()
    logger.info(`${ctx.state.id} HTTP ${ctx.response.status}`)
  })
  .use(router.routes())
  .use(router.allowedMethods())
  
app.listen({ port: SERVER_CONFIG.port })