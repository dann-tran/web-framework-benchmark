import { Hono } from 'hono'

const app = new Hono()
  .get('/', (c) => {
    return c.text('Hello, World!')
  })

export default app
