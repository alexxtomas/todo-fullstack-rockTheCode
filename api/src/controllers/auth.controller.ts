import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { User } from '../models/user.model.js'

export async function signUp(req: Request, res: Response) {
  const { email, password, username } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({
    email,
    password: hashedPassword,
    username
  })

  const savedUser = await user.save()
  res.status(201).json({ user: savedUser })
}
