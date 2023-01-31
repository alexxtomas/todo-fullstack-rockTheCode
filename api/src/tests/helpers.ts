import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { server } from '../index.js'
import { ITodo, Todo } from '../models/todo.model.js'
import { IUser, User } from '../models/user.model.js'
import app from '../servers/app.js'
import { IURLS } from '../types/index.js'

export const URLS: IURLS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGN_UP: '/api/auth/sign-up'
  },
  TODO: '/api/todo',
  USERS: '/api/users'
}

export const appServer = supertest(app)

export async function getAllUsers() {
  const users = await User.find()
  return users
}

export async function closeConnection() {
  mongoose.connection.close()
  await server.close()
}

export async function getInitialUser(): Promise<IUser> {
  const passwordHash = await bcrypt.hash('testPassword', 10)
  return {
    username: 'testUser',
    password: passwordHash,
    todoList: []
  }
}

export const initialUsers: IUser[] = [
  {
    username: 'pepe',
    password: 'pepePassword',
    todoList: []
  },
  {
    username: 'ramon',
    password: 'ramonPassword',
    todoList: []
  },
  {
    username: 'ramiro',
    password: 'ramiroPassword',
    todoList: []
  },
  {
    username: 'sandra',
    password: 'sandraPassword',
    todoList: []
  }
]

export function getInitialUsers() {
  return initialUsers.map(({ password, ...restOfUser }) => ({
    ...restOfUser,
    password: bcrypt.hashSync(password, 10)
  }))
}

export async function getOneUser() {
  const user = await User.findOne()
  return user
}

export async function getAllTodo() {
  const todo = await Todo.find()
  return todo
}
export async function initializeDb(): Promise<ITodo[]> {
  await User.deleteMany()
  await Todo.deleteMany()

  const initialUsers = getInitialUsers()
  await User.insertMany(initialUsers)
  const pepeUser = await User.findOne({ username: 'pepe' })
  const ramonUser = await User.findOne({ username: 'ramon' })

  const initialTodo = [
    {
      title: 'Go to the gym',
      user: pepeUser?._id!
    },
    {
      title: 'Study',
      user: ramonUser?._id!
    }
  ]

  await Todo.insertMany(initialTodo)

  return initialTodo
}

export async function login() {
  const user = {
    username: initialUsers[0].username,
    password: initialUsers[0].password
  }
  const {
    body: { token }
  } = await appServer.post('/api/auth/login').send(user)
  return token
}
