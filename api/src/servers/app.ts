import cors from 'cors'
import express, { Application } from 'express'
import morgan from 'morgan'
import '../db/connection.js'
import authRouter from '../routes/auth.routes.js'
import userRouter from '../routes/user.routes.js'
import cloudinary from '../services/cloudinary.js'

const app: Application = express()

cloudinary.setUp()

app.set('port', process.env.PORT ?? 3001)

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

export default app
