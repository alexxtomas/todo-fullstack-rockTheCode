import { Request, Response } from 'express'
import { User } from '../models/user.model.js'

export async function getAllUsers(_req: Request, res: Response) {
  const users = await User.find()
  res.status(!users.length ? 204 : 200).json(users)
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params
  const user = await User.findById(id)
  if (!user)
    return res.status(400).json({ error: 'No existent user with this id' })
  res.status(200).json(user)
}
