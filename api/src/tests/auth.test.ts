import bcrypt from 'bcrypt'
import { IUser, User } from '../models/user.model.js'
import { appServer, closeConnection, getUsers } from './helpers/shared.js'

describe('AUTH', () => {
  beforeEach(async () => {
    await User.deleteMany()

    const passwordHash = await bcrypt.hash('testPassword', 10)
    const initialUser = new User({
      username: 'testUser',
      password: passwordHash
    })

    await initialUser.save()
  })
  // TODO
  describe.skip('POST /api/auth/login')

  describe('POST /api/auth/sign-up', () => {
    test('works as expected when user sign up with correct credentials', async () => {
      const usersAtStart = await getUsers()

      const newUser: IUser = {
        username: 'New user',
        password: 'newUserPassword',
        todoList: []
      }

      await appServer
        .post('/api/auth/sign-up')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await getUsers()

      const usernames = usersAtEnd.map((user) => user.username)

      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
      expect(usernames).toContain(newUser.username)
    })
    test('when the user enters a username that does not exist, there should be a proper status code and error message', async () => {
      const { body } = await appServer.get('/api/auth/sign-up').expect(400)
      expect(body).toBe({ error: '' })
    })
  })

  afterAll(async () => {
    await closeConnection()
  })
})
