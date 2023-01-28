declare namespace Express {
  export interface Request {
    userId: string
  }
}

interface IEnvironment {
  URI: string | undefined
  message: string
}
export interface IEnvironments {
  development: IEnvironment
  testing: IEnvironment
  production: IEnvironment
}
