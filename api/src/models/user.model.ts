import { model, PopulatedDoc, Schema, Types } from 'mongoose'
import { ITodo } from './todo.model.js'

export interface IUser {
  username: string
  password: string
  todoList: Types.ObjectId[]
}

const userSchema = new Schema({
  username: { type: String, unique: true, required: true, min: 3 },
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
