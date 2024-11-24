import { createHttpError } from "jsr:@oak/commons/http_errors";
import sql from './db.ts'
import { type Item, type ItemWithCharFreq } from './model.ts'
import { Status } from "jsr:@oak/commons/status";

export async function getItemById(id: string): Promise<ItemWithCharFreq> {
  const items = await sql.queryObject<Item>`SELECT * FROM items WHERE id = ${id}`
  if (items.rowCount == 0)
    throw createHttpError(Status.NotFound)
  
  const item = items.rows[0]
  const charFreq = item.description.split('').reduce((prev, char) => {
    prev[char] = prev[char] || 0 + 1
    return prev
  }, {} as {[k: string]: number})

  return {...item, charFreq}
}