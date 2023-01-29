import supertest from 'supertest'
import app from '../../../servers/app.js'

export const appServer = supertest(app)
