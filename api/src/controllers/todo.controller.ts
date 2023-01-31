import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ITodo, Todo } from '../models/todo.model.js'
import { User } from '../models/user.model.js'
import cloudinary from '../services/cloudinary.js'
import { ALLOWED_FORMATS } from '../utils/constants.js'

export async function getAllTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const todos = await Todo.find()
    res.status(!todos.length ? 204 : 200).json(todos)
  } catch (error) {
    next(error)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { id } = req.params
    const todo = await Todo.findById(id)
    res.status(200).json(todo)
  } catch (error) {
    next(error)
  }
}

export async function createTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const newTodo: ITodo = req.body
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
    const { userId } = req
    const user = await User.findById(userId)
    newTodo.user = user?._id!
    const savedTodo = await new Todo(newTodo).save()
    if (user?.todoList) {
      user.todoList = [...user.todoList, savedTodo._id]
    }
    await user?.save()
    res.status(201).json(savedTodo)
  } catch (error) {
    next(error)
  }
}

export async function deleteTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { id } = req.params
    const deletedTodo = await Todo.findByIdAndDelete(id)
    if (deletedTodo?.image && deletedTodo?.image !== '') {
      await cloudinary.deleteFile(deletedTodo.image)
    }
    res.status(200).json(deletedTodo)
  } catch (error) {
    next(error)
  }
}

export async function updateTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { file } = req
    const { id } = req.params
    const oldTodo = await Todo.findById(id)
    const newTodo: ITodo = req.body
    if (oldTodo?.image && oldTodo?.image !== '') {
      await cloudinary.deleteFile(oldTodo.image)
    }
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
    const updatedTodo = await Todo.findByIdAndUpdate(id, newTodo, { new: true })

    res.status(202).json({ old: oldTodo, new: updatedTodo })
  } catch (error) {
    next(error)
  }
}
