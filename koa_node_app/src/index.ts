import Koa from 'koa'

const app = new Koa()
  .use(ctx => {
    ctx.response.body = 'Hello, World!'
  })

app.listen(3000)