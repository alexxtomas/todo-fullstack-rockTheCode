import { IUser, User } from '../models/user.model.js'
import { appServer, closeConnection, getUsers } from './helpers/shared.js'
import { getInitialUsers, getOneUser, initialUsers } from './helpers/users.js'

describe.skip('USERS', () => {
  beforeEach(async () => {
    await User.deleteMany()

    const initialUsers = getInitialUsers()
    await User.insertMany(initialUsers)
  })

  describe.skip('GET /api/users', async () => {
    test('should return a json', () => {
      appServer
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('if there are no conent should return 204', async () => {
      await User.deleteMany()
      const users = await getUsers()
      await appServer.get('/api/users').expect(204)
    })

    test('should return all initial users', async () => {
      const { body } = await appServer.get('/api/users')
      expect(body).toBeDefined()
      expect(body).toHaveLength(initialUsers.length)
    })

    test('should return all the passwords encrypted', async () => {
      const { body } = await appServer.get('/api/users')

      const users = body as IUser[]

      for (let user of users) {
        const userWithoutEncryptation = initialUsers.find(
          ({ username }) => username === user.username
        )

        expect(user.password).not.toEqual(userWithoutEncryptation?.password)
      }
    })
  })

  describe('GET /api/users/:id', () => {
    test('should return a user', async () => {
      const user = await getOneUser()
      const { body: returnedUser } = await appServer.get(
        `/api/users/${user?.id}`
      )
      expect(returnedUser.username).toEqual(user?.username)
      expect(returnedUser.id).toEqual(user?.id)
      expect(returnedUser.todoList).toEqual(user?.todoList)
    })
    test('It should return an appropriate error if the id is not valid', async () => {
      const expectedBody = { error: 'No existent user with this id' }
      const { body } = await appServer
        .get(`/api/users/4343432dfdfs`)
        .expect(400)

      expect(body).toEqual(expectedBody)
    })
  })

  afterAll(async () => {
    await closeConnection()
  })
})
