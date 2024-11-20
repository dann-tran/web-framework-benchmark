import * as Fastify from 'fastify'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Item, ItemWithCharFreq } from './model'

export function getItemById(fastify: FastifyInstance) {
  return function (
    req: FastifyRequest<{ Params: { id: string } }>, 
    reply: FastifyReply
  ) {
    const id = req.params.id
    fastify.pg.query<Item>(
      `SELECT * FROM items WHERE id = ${id}`,
      (err, items) => reply.send(
        err 
        || (
          items.rowCount == 0
          ? Fastify.errorCodes.FST_ERR_NOT_FOUND()
          : augmentItemWithCharCounts(items.rows[0])
        )
      )
    )
  }
}

function augmentItemWithCharCounts(item: Item): ItemWithCharFreq {
  const charFreq = item.description.split('').reduce((prev, char) => {
    prev[char] = prev[char] || 0 + 1
    return prev
  }, {} as {[k: string]: number})

  return {...item, charFreq}
}