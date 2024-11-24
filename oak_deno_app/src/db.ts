import { Client } from "postgres"
import { DB_CONFIG } from "./app-config.ts";

const sql = new Client({
  user: DB_CONFIG.username,
  password: DB_CONFIG.password,
  hostname: DB_CONFIG.host,
  port: DB_CONFIG.port,
  database: DB_CONFIG.database
})
await sql.connect()
export default sql