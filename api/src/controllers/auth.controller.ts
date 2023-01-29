import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { IUser, User } from '../models/user.model.js'
export async function signUp(req: Request, res: Response) {
  const { password, username } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({
    password: hashedPassword,
    username
  })

  const savedUser = await user.save()
  res.status(201).json({ user: savedUser })
}

export async function login(req: Request, res: Response) {
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
}
