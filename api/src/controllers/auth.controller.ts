import { IUser, User } from '@models/user.model.js'
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { password, username } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      password: hashedPassword,
      username
    })

    const savedUser = await user.save()
    res.status(201).json({ user: savedUser })
  } catch (error: any) {
    next(error)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { username } = req.body
    const { JWT_SECRET } = process.env
    const user = await User.findOne({ username })

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) * (60 * 60 * 24 * 7),
        id: user?.id
      },
      JWT_SECRET!
    )
    res.status(200).json({ token })
  } catch (error) {
    next(error)
  }
}
