import { body, param } from 'express-validator'
import { Todo } from '../models/todo.model.js'

export const idValidator = [
  param('id')
    .isString()
    .notEmpty()
    .custom(async (value) => {
      const todo = await Todo.findById(value)
      if (!todo) throw new Error('no existent todo with this id')
      return true
    })
]

export const createAndUpdateTodoValidator = [
  body('title')
    .isString()
    .withMessage('title should be a string')
    .notEmpty()
    .withMessage('title is a required field'),
  body('description')
    .optional()
    .isString()
    .withMessage('description should be a string'),

  body('completed')
    .optional()
    .isBoolean()
    .withMessage('completed field should be a boolean value')
]
