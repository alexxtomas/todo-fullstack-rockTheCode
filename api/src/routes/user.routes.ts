import { getAllUsers, getUserById } from '@controllers/user.controller.js'
import { Router } from 'express'

const router = Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)

export default router
