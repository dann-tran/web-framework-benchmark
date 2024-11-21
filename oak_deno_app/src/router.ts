import { Router } from "@oak/oak/router";

export const router = new Router()
  .get("/", (ctx) => {
    ctx.response.body = 'Hello, World!'
  })
