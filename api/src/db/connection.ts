import mongoose from 'mongoose'
import { getURI } from '../utils/logic.js'
export async function dbConnection() {
  await mongoose
    .set('strictQuery', false)
    .connect(getURI())
    .then(() => console.log(`Connected to database 🚀 `))
    .catch((err) => console.error(err))
}
