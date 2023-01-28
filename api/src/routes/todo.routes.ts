import { Router } from 'express'
import { createTodo } from '../controllers/todo.controller.js'
import { upload } from '../middlewares/upload.middleware.js'

const router = Router()

router.get('/')
router.post('/', upload.single('image'), createTodo)

export default router
