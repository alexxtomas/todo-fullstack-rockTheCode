import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

const app = express()

app.set('port', process.env.PORT || 3001)

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/todo')
app.use('/api/users')
app.use('/api/auth')

export default app
