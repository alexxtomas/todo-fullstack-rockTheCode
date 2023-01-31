import { Request, Response } from 'express'
import { ITodo } from '../models/todo.model.js'
import { User } from '../models/user.model.js'

export async function getAllUsers(_req: Request, res: Response) {
  const users = await User.find().populate<ITodo>('todoList', {
    title: 1,
    description: 1,
    image: 1,
    completed: 1
  })
  res.status(!users.length ? 204 : 200).json(users)
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params
  const user = await User.findById(id).populate<ITodo>('todoList', {
    title: 1,
    description: 1,
    image: 1,
    completed: 1
  })
  if (!user)
    return res.status(400).json({ error: 'No existent user with this id' })
  res.status(200).json(user)
}
