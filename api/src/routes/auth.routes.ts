import { login, signUp } from '@controllers/auth.controller.js'
import { Router } from 'express'
import {
  loginValidator,
  signUpValidator
} from '../validations/auth.validations.js'
const router = Router()

router.post('/sign-up', signUpValidator, signUp)
router.post('/login', loginValidator, login)

export default router
