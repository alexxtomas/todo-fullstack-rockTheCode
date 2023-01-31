import { NextFunction, Request, Response } from 'express'
import { ERRORS } from '../utils/constants.js'

export function errorHandlerMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { status, message } = ERRORS[error.name] || ERRORS['Default']

  res.status(status).json({ error: message })
}
