import { Types } from 'mongoose'
import supertest from 'supertest'
import { ITodo, Todo } from '../models/todo.model.js'
import { appServer } from './helpers/shared.js'
import { getAllTodo, initializeDb } from './helpers/todo.js'

describe('TODO', () => {
  let initialTodo: ITodo[] = []
  beforeEach(async () => {
    const todos = await initializeDb()
    initialTodo = [...todos]
  })
  describe.skip('GET /api/todos', () => {
    test('todos are returned as json', async () => {
      await appServer
        .get('/api/todo')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('if there are no conent should return 204', async () => {
      await Todo.deleteMany()
      const allTodo = await getAllTodo()
      await appServer.get('/api/todo').expect(204)

      expect(allTodo).toHaveLength(0)
    })

    test('should return all initial todo', async () => {
      const { body } = await appServer.get('/api/todo')
      expect(body).toBeDefined()
      expect(body).toHaveLength(initialTodo.length)
    })

    test('should return all todo populated', async () => {
      interface User {
        username: string
        id: Types.ObjectId
      }
      const { body } = await appServer.get('/api/todo')
      const allPopuletedFieldsAreAvailable = body.every(
        ({ user }: { user: User }) => user.username && user.id
      )

      expect(allPopuletedFieldsAreAvailable).toBeTruthy()
    })
  })
  describe('GET /api/todo/:id', async () => {
    // test('should return a error code if id is not valid', )
    const todo = await Todo.findOne()
    test('should return a json', async () => {
      await appServer
        .get(`/api/todo/${todo?._id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  })
})
