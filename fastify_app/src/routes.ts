import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'


const routes: FastifyPluginCallback<{}> = (fastify, _opts, done) => {
  fastify.get("/", helloWorld)

  function helloWorld(_req: FastifyRequest, _reply: FastifyReply) {
    return "Hello, World!"
  }
  
  done()
}

export default fp(routes, '5.x')

