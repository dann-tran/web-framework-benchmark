import express, { Request } from 'express'
import { getItemById } from './controller'

const router = express.Router()

router.get("/", (_, res) => {
  res.send("Hello, World!")
})

router.get("/items/:id", async (req: Request<{ id: string }>, res) => {
  const item = await getItemById(req.params.id)
  res.json(item)
})

export default router