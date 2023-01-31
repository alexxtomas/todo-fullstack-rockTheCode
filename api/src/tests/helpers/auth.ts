import bcrypt from 'bcrypt'
import { IUser } from '../../models/user.model.js'
interface IURL {
  signUp: string
  login: string
}
export const URL: IURL = {
  signUp: '/api/auth/sign-up',
  login: '/api/auth/login'
}

export async function getInitialUser(): Promise<IUser> {
  const passwordHash = await bcrypt.hash('testPassword', 10)
  return {
    username: 'testUser',
    password: passwordHash,
    todoList: []
  }
}
