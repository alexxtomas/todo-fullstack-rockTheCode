import { getURI } from '@utils/logic.js'
import mongoose from 'mongoose'
await mongoose
  .set('strictQuery', false)
  .connect(getURI())
  .then(() => console.log(`Connected to database 🚀 `))
  .catch((err) => console.error(err))
