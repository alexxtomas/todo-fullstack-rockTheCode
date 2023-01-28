declare namespace Express {
  export interface Request {
    userId: string
  }
}

interface IEnvironment {
  name: string
  URI: string | undefined
  message: string
}
export interface IEnvironments {
  development: IEnvironment
  testing: IEnvironment
  production: IEnvironment
}
