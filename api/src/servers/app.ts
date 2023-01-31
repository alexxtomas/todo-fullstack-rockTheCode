import cors from 'cors'
import 'dotenv/config.js'
import express, { Application } from 'express'
import morgan from 'morgan'
import { dbConnection } from '../db/connection.js'
import { errorHandlerMiddleware } from '../middlewares/errorHandler.middleware.js'
import authRouter from '../routes/auth.routes.js'
import todoRouter from '../routes/todo.routes.js'
import userRouter from '../routes/user.routes.js'
import cloudinary from '../services/cloudinary.js'
import { checkNeededEnvironmentVariables } from '../utils/logic.js'

checkNeededEnvironmentVariables()

dbConnection()
const app: Application = express()

cloudinary.setUp()

app.set('port', process.env.PORT ?? 3001)

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/todo', todoRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

app.use(errorHandlerMiddleware)

export default app
