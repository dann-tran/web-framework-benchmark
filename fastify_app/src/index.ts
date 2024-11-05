import Fastify from 'fastify'
import routes from './routes'


async function start() {
  const fastify = Fastify()
  await fastify.register(routes)
  const address = await fastify.listen({ port: 3000 })
  console.log(`Server listening at ${address}`)
}

start().catch(err => {
  console.error(err)
  process.exit(1)
})
