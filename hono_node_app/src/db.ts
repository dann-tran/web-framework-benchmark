import postgres from 'postgres'
import { DB_CONFIG } from './app-config.js'
import { winstonLogger } from './logging.js'

winstonLogger.info(`DB config: ${JSON.stringify(DB_CONFIG)}`)

const sql = postgres(DB_CONFIG)

export default sql