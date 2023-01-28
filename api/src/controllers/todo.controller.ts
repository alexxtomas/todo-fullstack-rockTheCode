import { Request, Response } from 'express'
import { Todo } from '../models/todo.model.js'
import { ALLOWED_FORMATS } from '../utils/constants.js'
export async function createTodo(req: Request, res: Response) {
  const newTodo = new Todo(req.body)
  const { file } = req

  if (file) {
    if (!ALLOWED_FORMATS.includes(file.mimetype)) {
      return res.status(400).json({
        error: `Images must be in  ${ALLOWED_FORMATS.map(
          (format) => ` ${format}`
        )} format`
      })
    }
    newTodo.image = file.path
  }
  const savedTodo = await newTodo.save()
  res.status(201).json(savedTodo)
}
