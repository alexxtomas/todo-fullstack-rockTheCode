import { User } from '@models/user.model.js'
import app from '@servers/app.js'
import { server } from '@src/index.js'
import mongoose from 'mongoose'
import supertest from 'supertest'
export const appServer = supertest(app)

export async function getUsers() {
  const users = await User.find()
  return users
}

export async function closeConnection() {
  mongoose.connection.close()
  await server.close()
}
