import { Request, Response } from 'express'
import { User } from '../models/user.model.js'

export async function getAllUsers(_req: Request, res: Response) {
  const users = await User.find()
  res.status(!users.length ? 204 : 200).json(users)
}
