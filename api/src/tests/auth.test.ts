import { IUser, User } from '@models/user.model.js'
import bcrypt from 'bcrypt'
import { appServer, closeConnection, getUsers } from './helpers/shared.js'

describe.skip('AUTH', () => {
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
    test('works as expected when user sign up', async () => {
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
  })

  afterAll(async () => {
    await closeConnection()
  })
})
