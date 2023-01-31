import bcrypt from 'bcrypt'
import { IUser, User } from '../models/user.model.js'
import { getInitialUser } from './helpers/auth.js'
import { appServer, closeConnection, getUsers } from './helpers/shared.js'

describe('AUTH', () => {
  beforeEach(async () => {
    await User.deleteMany()

    const initialUser = await getInitialUser()
    await new User(initialUser).save()
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

      const usersAtEnd: IUser[] = await getUsers()

      const usernames = usersAtEnd.map((user) => user.username)

      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
      expect(usernames).toContain(newUser.username)
    })
    test('when the user enters a username that does not exist, there should be a proper status code and error message', async () => {
      const existentUser = await getInitialUser()
      const { body } = await appServer
        .post('/api/auth/sign-up')
        .send(existentUser)
        .expect(400)

      expect(body).toStrictEqual({
        errors: [
          {
            value: existentUser.username,
            msg: 'username is not available',
            param: 'username',
            location: 'body'
          }
        ]
      })
    })

    test('when the user enters a username that does not have a minimum length of 3, there should be a proper status code and error message', async () => {
      const badUsername = {
        username: 'al',
        password: '1rfjkefjkdjkfd'
      }

      const { body } = await appServer
        .post('/api/auth/sign-up')
        .send(badUsername)
        .expect(400)

      expect(body).toStrictEqual({
        errors: [
          {
            value: badUsername.username,
            msg: 'username must have a minimum length of 3',
            param: 'username',
            location: 'body'
          }
        ]
      })
    })

    test('when the user enters a password that does not have a minimum length of 6, there should be a proper status code and error message', async () => {
      const badPassword = {
        username: 'alex',
        password: '123'
      }

      const { body } = await appServer
        .post('/api/auth/sign-up')
        .send(badPassword)
        .expect(400)

      expect(body).toStrictEqual({
        errors: [
          {
            value: badPassword.password,
            msg: 'password must have a minimum length of 6',
            param: 'password',
            location: 'body'
          }
        ]
      })
    })

    afterAll(async () => {
      await closeConnection()
    })
  })
})

// 'when the user enters a username that does not have a minimum length of 3, there should be a proper status code and error message'
