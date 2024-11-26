import { default as postgres } from 'postgres'
import { DB_CONFIG } from './app-config'
import { winstonLogger } from './logging'

winstonLogger.info(`DB config: ${JSON.stringify(DB_CONFIG)}`)

const sql = postgres(DB_CONFIG)

export default sql