import bcrypt from 'bcrypt'
import { body } from 'express-validator'
import { User } from '../models/user.model.js'
export const signUpValidator = [
  body('username')
    .isString()
    .withMessage('username should be a string and is required')
    .isLength({ min: 3 })
    .withMessage('username must have a minimum length of 3')
    .custom(async (value) => {
      const user = await User.findOne({ username: value })
      if (user) throw new Error('username is not available')
      return true
    })
    .notEmpty(),
  body('password')
    .isString()
    .withMessage('password should be a string and is required')
    .isLength({ min: 6 })
    .withMessage('password must have a minimum length of 6')
]

export const loginValidator = [
  body('username')
    .isString()
    .withMessage('username should be a string and is required')
    .isLength({ min: 3 })
    .withMessage('username must have a minimum length of 3')
    .custom(async (value, { req }) => {
      const user = await User.findOne({ username: value })
      if (!user) throw new Error('invalid credentials')
      return true
    }),
  body('password')
    .isString()
    .withMessage('password should be a string and is required')
    .isLength({ min: 6 })
    .withMessage('password must have a minimum length of 6')
    .custom(async (value, { req }) => {
      const { username } = req.body
      const user = await User.findOne({ username })
      const isAValidPassword = await bcrypt.compare(value, user?.password ?? '')
      if (!isAValidPassword) throw new Error('invalid credentails')

      return true
    })
]
