import * as log from "@std/log"
import * as path from "@std/path"
import * as fs from '@std/fs'
import { LOGGING_CONFIG } from "./app-config.ts";


class CustomFileHandler extends log.FileHandler {
  override handle(logRecord: log.LogRecord): void {
    super.handle(logRecord)
    if (
      logRecord.level <= log.LogLevels.ERROR &&
      logRecord.level >= this.level
    ) this.flush()
  }
}

export const fileHandler = new CustomFileHandler(LOGGING_CONFIG.level, {
  formatter: log.formatters.jsonFormatter,
  filename: LOGGING_CONFIG.filename
})

export async function setupLogging() {
  const dir = path.dirname(LOGGING_CONFIG.filename)
  if (!(await fs.exists(dir))) await Deno.mkdir(dir)

  log.setup({
    handlers: { default: fileHandler }
  })
}