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

interface IError {
  status: number
  message: string
}
export interface IErrors {
  [key: string]: IError
}
