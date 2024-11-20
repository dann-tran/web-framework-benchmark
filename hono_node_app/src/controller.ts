import sql from './db.js'
import { NotFoundError } from './exceptions.js'
import { type Item, type ItemWithCharFreq } from './model.js'

export async function getItemById(id: string): Promise<ItemWithCharFreq> {
  const items = await sql<Item[]>`SELECT * FROM items WHERE id = ${id}`
  if (items.length == 0)
    throw new NotFoundError()
  
  const item = items[0]
  const charFreq = item.description.split('').reduce((prev, char) => {
    prev[char] = prev[char] || 0 + 1
    return prev
  }, {} as {[k: string]: number})

  return {...item, charFreq}
}