import { model, Schema } from 'mongoose'
import { ITodo } from './todo.model.js'

export interface IUser {
  username: string
  email: string
  password: string
  todoList: ITodo[]
}

const userSchema = new Schema({
  username: { type: String, unique: true, required: true, min: 3 },
  email: { type: String, unique: true, required: true, min: 9 },
  password: { type: String, required: true, min: 6 },
  todoList: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const User = model<IUser>('User', userSchema)
