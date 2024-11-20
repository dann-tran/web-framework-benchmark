import { Hono } from 'hono';
import type { RequestIdVariables } from 'hono/request-id';
import { getItemById } from './controller.js';

export const router = new Hono<{
  Variables: RequestIdVariables
}>()
  .get('/', (c) => {
    return c.text('Hello, World!')
  })
  .get('/items/:id', async (c) => {
    const id = c.req.param('id')
    return c.json(await getItemById(id))
  })