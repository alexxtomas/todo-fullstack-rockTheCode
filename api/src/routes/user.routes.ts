import { Router } from 'express'
import {
  getAllUsersController,
  getUserByIdController
} from '../controllers/user.controller.js'

const router = Router()

router.get('/', getAllUsersController)
router.get('/:id', getUserByIdController)

export default router
