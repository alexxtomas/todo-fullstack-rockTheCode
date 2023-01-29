import { IEnvironments } from '../../types.js'
import { getEnvironment } from './logic.js'
const { MONGODB_DEVELOPMENT_URI, MONGODB_TESTING_URI, MONGODB_PRODUCTION_URI } =
  process.env

export const ENVIRONMENTS: IEnvironments = {
  development: {
    name: 'Development',
    URI: MONGODB_DEVELOPMENT_URI,
    message: 'DEVELOPMENT MODE 💻'
  },
  testing: {
    name: 'Testing',
    URI: MONGODB_TESTING_URI,
    message: 'TESTING MODE 🧪'
  },
  production: {
    name: 'Production',
    URI: MONGODB_PRODUCTION_URI,
    message: 'WARNING PRODUCTION MODE❗'
  }
}

export const ALLOWED_FORMATS = [
  'image/jpg',
  'image/png',
  'image/jpeg',
  'image/webp'
]
export const CLOUDINARY_PATH = `todo-fullstack-rockTheCode/${
  !getEnvironment ? 'testing' : getEnvironment().name
}`
