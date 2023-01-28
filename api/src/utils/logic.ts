import { IEnvironments } from '../../types.js'
import { ENVIRONMENTS } from './constants.js'
export function getURI() {
  const { NODE_ENV } = process.env
  const environment = ENVIRONMENTS[NODE_ENV as keyof IEnvironments]
  if (!environment) {
    throw new Error('Invalid environment ❌')
  }
  if (!environment.URI) {
    throw new Error(`No Environment variable defined for ${NODE_ENV} ❌`)
  }
  console.log(environment.message)
  return environment.URI
}
