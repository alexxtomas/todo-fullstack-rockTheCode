import { ITodo, Todo } from '../../models/todo.model.js'
import { User } from '../../models/user.model.js'
import { getInitialUsers } from './users.js'

export async function getAllTodo() {
  const todo = await Todo.find()
  return todo
}
export async function initializeDb(): Promise<ITodo[]> {
  await User.deleteMany()
  await Todo.deleteMany()

  const initialUsers = getInitialUsers()
  await User.insertMany(initialUsers)
  const pepeUser = await User.findOne({ username: 'pepe' })
  const ramonUser = await User.findOne({ username: 'ramon' })

  const initialTodo = [
    {
      title: 'Go to the gym',
      user: pepeUser?._id!
    },
    {
      title: 'Study',
      user: ramonUser?._id!
    }
  ]

  await Todo.insertMany(initialTodo)

  return initialTodo
}
