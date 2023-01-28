import { model, Schema } from 'mongoose'
import { IUser } from './user.model.js'

export interface ITodo {
  title: string
  description: string
  completed: boolean
  image: string
  user: IUser
}

const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  image: { type: String, default: '' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

todoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Todo = model<ITodo>('Todo', todoSchema)
