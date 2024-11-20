import { HTTPException } from 'hono/http-exception'

type HTTPExceptionOptions = {
  res?: Response
  message?: string
  cause?: unknown
}

export class NotFoundError extends HTTPException {
  constructor(options?: HTTPExceptionOptions) {
    super(400, options)
  }
}

export class InternalServerError extends HTTPException {
  constructor(options?: HTTPExceptionOptions) {
    super(500, options)
  }
}