import mongoose from 'mongoose'
import supertest from 'supertest'
import { server } from '../../../index.js'
import { User } from '../../../models/user.model.js'
import app from '../../../servers/app.js'
export const appServer = supertest(app)

export async function getUsers() {
  const users = await User.find()
  return users
}

export function closeConnection() {
  mongoose.connection.close()
  server.close()
}
