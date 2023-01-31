import { ERRORS } from '@utils/constants.js'
import { NextFunction, Request, Response } from 'express'

export function errorHandlerMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { status, message } = ERRORS[error.name] || ERRORS['Default']

  res.status(status).json({ error: message })
}
