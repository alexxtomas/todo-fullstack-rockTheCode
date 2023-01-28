import { IEnvironments } from '../../types.js'
import { ENVIRONMENTS } from './constants.js'

export function getEnvironment() {
  const { NODE_ENV } = process.env
  const environment = ENVIRONMENTS[NODE_ENV as keyof IEnvironments]

  return environment
}

export function getURI() {
  const environment = getEnvironment()
  if (!environment) {
    throw new Error('Invalid environment ❌')
  }
  if (!environment.URI) {
    throw new Error(
      `No URI environment variable defined for ${environment.name} ❌`
    )
  }
  console.log(environment.message)
  return environment.URI
}

export function getCloudinrayKeys() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error(
      'No cloudinary keys available, please set your keys in file .env'
    )
  }
  return { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET }
}
