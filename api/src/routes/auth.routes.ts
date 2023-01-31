import { Router } from 'express'
import {
  loginController,
  signUpController
} from '../controllers/auth.controller.js'
import {
  loginValidator,
  signUpValidator
} from '../validations/auth.validations.js'
const router = Router()

router.post('/sign-up', signUpValidator, signUpController)
router.post('/login', loginValidator, loginController)

export default router
