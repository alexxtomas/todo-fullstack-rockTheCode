import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
export function tokenValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  interface IPayload {
    id: string
    iat: number
    exp: number
  }
  const authorization = req.get('authorization')

  if (!authorization?.toLocaleLowerCase().startsWith('bearer')) {
    return res.status(401).json({ error: 'missing token' })
  }
  const token = authorization.substring(7)

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? '') as IPayload
    req.userId = payload.id
  } catch (error) {
    return res.status(401).json({ error: 'invalid token' })
  }

  next()
}
