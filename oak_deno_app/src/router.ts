import { Router } from "@oak/oak/router";
import { getItemById } from "./controller.ts";

export const router = new Router()
  .get("/", (ctx) => {
    ctx.response.body = 'Hello, World!'
  })
  .get("/items/:id", async (ctx) => {
    const id = ctx.params.id
    ctx.response.body = await getItemById(id)
  })
