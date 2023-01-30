import { Router } from 'express'
import {
  createTodo,
  deleteTodo,
  getAllTodo
} from '../controllers/todo.controller.js'
import { upload } from '../middlewares/upload.middleware.js'
import {
  createTodoValidator,
  idValidator
} from '../validations/todo.validator.js'

const router = Router()

router.get('/', getAllTodo)
router.get('/:id', idValidator)
router.post('/', [upload.single('image')], createTodoValidator, createTodo)
router.delete('/:id', idValidator, deleteTodo)
export default router
