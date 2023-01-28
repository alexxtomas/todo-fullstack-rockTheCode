import { IEnvironments } from '../../types.js'

const { MONGODB_DEVELOPMENT_URI, MONGODB_TESTING_URI, MONGODB_PRODUCTION_URI } =
  process.env

export const ENVIRONMENTS: IEnvironments = {
  development: {
    URI: MONGODB_DEVELOPMENT_URI,
    message: 'DEVELOPMENT MODE 💻'
  },
  testing: {
    URI: MONGODB_TESTING_URI,
    message: 'TESTING MODE 🧪'
  },
  production: {
    URI: MONGODB_PRODUCTION_URI,
    message: 'WARNING PRODUCTION MODE❗'
  }
}
