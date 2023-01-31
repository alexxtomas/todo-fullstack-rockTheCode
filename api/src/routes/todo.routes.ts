import {
  createTodo,
  deleteTodo,
  getAllTodo,
  getById,
  updateTodo
} from '@controllers/todo.controller.js'
import { upload } from '@middlewares/upload.middleware.js'
import { Router } from 'express'
import {
  createAndUpdateTodoValidator,
  idValidator
} from '../validations/todo.validator.js'

const router = Router()

router.get('/', getAllTodo)
router.get('/:id', idValidator, getById)
router.post(
  '/',
  [upload.single('image')],
  createAndUpdateTodoValidator,
  createTodo
)
router.put(
  '/:id',
  [upload.single('image')],
  idValidator,
  createAndUpdateTodoValidator,
  updateTodo
)
router.delete('/:id', idValidator, deleteTodo)
export default router
