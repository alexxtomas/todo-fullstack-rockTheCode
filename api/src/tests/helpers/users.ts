import { IUser, User } from '@models/user.model.js'
import bcrypt from 'bcrypt'
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
