import express from 'express'
import { SERVER_CONFIG } from './app-config';
import { errorLoggerMiddleware, logger, loggerMiddleware } from './logging';
import router from './router';


const app = express()

app.use(loggerMiddleware)
app.use(router)
app.use(errorLoggerMiddleware)

app.listen(SERVER_CONFIG.port, () => {
  logger.log({
    level: 'info',
    message: `Server is running at http://localhost:${SERVER_CONFIG.port}`
  });
})