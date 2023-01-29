import { Router } from 'express'
import { login, signUp } from '../controllers/auth.controller.js'

const router = Router()

router.post('/sign-up', signUp)
router.post('/login', login)

export default router
