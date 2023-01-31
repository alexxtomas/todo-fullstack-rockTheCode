import { Types } from 'mongoose'
import { ITodo, Todo } from '../models/todo.model.js'
import { appServer, getAllTodo, initializeDb, login, URLS } from './helpers.js'

describe('TODO', () => {
  let initialTodo: ITodo[] = []
  beforeEach(async () => {
    const todos = await initializeDb()
    initialTodo = [...todos]
  })
  describe('GET /api/todos', () => {
    test('todos are returned as json', async () => {
      await appServer
        .get(URLS.TODO)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('if there are no conent should return 204', async () => {
      await Todo.deleteMany()
      const allTodo = await getAllTodo()
      await appServer.get(URLS.TODO).expect(204)

      expect(allTodo).toHaveLength(0)
    })

    test('should return all initial todo', async () => {
      const { body } = await appServer.get(URLS.TODO)
      expect(body).toBeDefined()
      expect(body).toHaveLength(initialTodo.length)
    })

    test('should return all todo populated', async () => {
      interface User {
        username: string
        id: Types.ObjectId
      }
      const { body } = await appServer.get(URLS.TODO)
      const allPopuletedFieldsAreAvailable = body.every(
        ({ user }: { user: User }) => user.username && user.id
      )

      expect(allPopuletedFieldsAreAvailable).toBeTruthy()
    })
  })
  describe('GET /api/todo/:id', async () => {
    test('should return a json an appropriate status code if a correct id is sent', async () => {
      const todo = await Todo.findOne()

      await appServer
        .get(`${URLS.TODO}/${todo?.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('should return an appropriate status code and an error message if an invalid id is sent.', async () => {
      const invalidId = '34234dfsfsd43432432'

      const { body } = await appServer
        .get(`${URLS.TODO}/${invalidId}`)
        .expect(400)

      expect(body).toStrictEqual({
        errors: [
          {
            value: '34234dfsfsd43432432',
            msg: 'Cast to ObjectId failed for value "34234dfsfsd43432432" (type string) at path "_id" for model "Todo"',
            param: 'id',
            location: 'params'
          }
        ]
      })
    })
  })
  describe('POST /api/todo', () => {
    test('if  token is missing should return appropriate status code and an error message', async () => {
      const newTodo: ITodo = {
        title: 'Go shopping'
      }
      const { body } = await appServer.post(URLS.TODO).send(newTodo).expect(401)

      expect(body).toStrictEqual({
        error: 'missing token'
      })
    })
  })
  test('if token is invalid should return appropriate status code and an error message', async () => {
    const newTodo: ITodo = {
      title: 'Go shopping'
    }
    const invalidToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEwMTMxMzc0OTczODg4MDAsImlkIjoiNjNkOGQzY2UzNmU4NDg2MGM1ODFmZWU0IiwiaWF0IjoxNjc1MTYxMjA2fQ.tBcWf2S4jrKvd2DpTXsoRZ9k2Vv78SD2Yoh3v11z0w'

    const { body } = await appServer
      .post(URLS.TODO)
      .send(newTodo)
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(401)

    expect(body).toStrictEqual({
      error: 'invalid token'
    })
  })
  test('if title field is not set should return  appropriate status code and an error message', async () => {
    const token = await login()
    const { body } = await appServer
      .post(URLS.TODO)
      .send({})
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
    expect(body).toStrictEqual({
      errors: [
        {
          msg: 'title should be a string',
          param: 'title',
          location: 'body'
        },
        {
          msg: 'title is a required field',
          param: 'title',
          location: 'body'
        }
      ]
    })
  })

  test('if description field is not a string should return appropriate status code and error message', async () => {
    const token = await login()

    const newTodo = {
      title: 'Go to the gym',
      description: 32323
    }
    const { body } = await appServer
      .post(URLS.TODO)
      .send(newTodo)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
    expect(body).toStrictEqual({
      errors: [
        {
          value: 32323,
          msg: 'description should be a string',
          param: 'description',
          location: 'body'
        }
      ]
    })
  })

  test('if completed field is not a boolean should return appropriate status code and error message', async () => {
    const token = await login()

    const newTodo = {
      title: 'Go to the gym',
      description: "it's important!",
      completed: 32323
    }
    const { body } = await appServer
      .post(URLS.TODO)
      .send(newTodo)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
    expect(body).toStrictEqual({
      errors: [
        {
          value: 32323,
          msg: 'completed field should be a boolean value',
          param: 'completed',
          location: 'body'
        }
      ]
    })
  })

  test('if token is valid and the todo should create the todo', async () => {
    const token = await login
    const newTodo: ITodo = {
      title: 'Go to the gym',
      description: "it's important!",
      completed: false
    }

    await appServer
      .post(URLS.TODO)
      .send(newTodo)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    const allTodo = await Todo.find()

    const hasTheNewTodoBeenCreated = allTodo.find(
      ({ title, description, completed }) =>
        title === newTodo.title &&
        description === newTodo.description &&
        completed === newTodo.completed
    )

    expect(allTodo).toHaveLength(initialTodo.length + 1)
    expect(hasTheNewTodoBeenCreated).not.toBeUndefined()
  })
})
