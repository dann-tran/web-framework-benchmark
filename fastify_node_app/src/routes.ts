import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'
import { getItemById } from './controller'


const routes: FastifyPluginCallback<{}> = (fastify, _opts, done) => {
  fastify.get("/", (_req, _reply) => "Hello, World!")
  fastify.get("/items/:id", getItemById(fastify))
  
  done()
}

export default fp(routes, '5.x')

