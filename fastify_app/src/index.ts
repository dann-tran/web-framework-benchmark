import Fastify from 'fastify'
import FastifyPg from '@fastify/postgres'
import { v4 as uuidv4 } from 'uuid'
import routes from './routes'
import { DB_CONFIG, LOGGING_CONFIG, SERVER_CONFIG } from './app-config'


const fastify = Fastify({
  genReqId: _ => uuidv4(),
  logger: {
    level: LOGGING_CONFIG.level
  }
})

fastify.log.info("Connecting to DB with config: ", DB_CONFIG)
fastify.register(FastifyPg, DB_CONFIG)

fastify.register(routes)

fastify.listen({...SERVER_CONFIG}) // .listen will mutate the arg passed in, but node-config object must be immutable, so a copy is made