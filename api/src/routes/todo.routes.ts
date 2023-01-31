import { Router } from 'express'
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  getById,
  updateTodo
} from '../controllers/todo.controller.js'
import { tokenValidator } from '../middlewares/token.middleware.js'
import { upload } from '../middlewares/upload.middleware.js'
import {
  createAndUpdateTodoValidator,
  idValidator
} from '../validations/todo.validator.js'

const router = Router()

router.get('/', getAllTodo)
router.get('/:id', idValidator, getById)
router.post(
  '/',
  [tokenValidator, upload.single('image')],
  createAndUpdateTodoValidator,
  createTodo
)
router.put(
  '/:id',
  [tokenValidator, upload.single('image')],
  idValidator,
  createAndUpdateTodoValidator,
  updateTodo
)
router.delete('/:id', tokenValidator, idValidator, deleteTodo)
export default router
