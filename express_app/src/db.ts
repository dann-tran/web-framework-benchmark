import postgres from 'postgres'
import { DB_CONFIG } from './app-config'
import logger from './logging'

logger.info(`DB config: ${JSON.stringify(DB_CONFIG)}`)

const sql = postgres(DB_CONFIG)

export default sql