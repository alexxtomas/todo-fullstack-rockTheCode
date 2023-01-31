import { Router } from 'express'
import {
  createTodoController,
  deleteTodoController,
  getAllTodoController,
  getByIdController,
  updateTodoController
} from '../controllers/todo.controller.js'
import { tokenValidator } from '../middlewares/token.middleware.js'
import { upload } from '../middlewares/upload.middleware.js'
import {
  createAndUpdateTodoValidator,
  idValidator
} from '../validations/todo.validator.js'

const router = Router()

router.get('/', getAllTodoController)
router.get('/:id', idValidator, getByIdController)
router.post(
  '/',
  [tokenValidator, upload.single('image')],
  createAndUpdateTodoValidator,
  createTodoController
)
router.put(
  '/:id',
  [tokenValidator, upload.single('image')],
  idValidator,
  createAndUpdateTodoValidator,
  updateTodoController
)
router.delete('/:id', tokenValidator, idValidator, deleteTodoController)
export default router
