import { Router } from 'express'
import {
  createTodo,
  deleteTodo,
  getAllTodo
} from '../controllers/todo.controller.js'
import { upload } from '../middlewares/upload.middleware.js'

const router = Router()

router.get('/', getAllTodo)
router.post('/', upload.single('image'), createTodo)
router.delete('/:id', deleteTodo)
export default router
