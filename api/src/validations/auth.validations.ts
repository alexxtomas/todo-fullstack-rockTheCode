import { body } from 'express-validator'
import { User } from '../models/user.model.js'

export const signUpValidator = [
  body('username')
    .isString()
    .isLength({ min: 3 })
    .custom(async (value) => {
      const user = await User.findOne({ username: value })
      if (user) throw new Error('Username is not available')
      return true
    })
]
