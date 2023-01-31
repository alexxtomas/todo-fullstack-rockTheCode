import { IUser, User } from '../models/user.model.js'
import { getInitialUser, URL } from './helpers/auth.js'
import { appServer, closeConnection, getUsers } from './helpers/shared.js'

describe('AUTH', () => {
  beforeEach(async () => {
    await User.deleteMany()

    const initialUser = await getInitialUser()
    await new User(initialUser).save()
  })
  describe('POST /api/auth/login', () => {
    test('when user enters a correct credentials should get a token and a proper status code', async () => {
      const { username } = await getInitialUser()

      const { body } = await appServer
        .post(URL.login)
        .send({ username, password: 'testPassword' })
        .expect(200)

      expect(body.token).toBeDefined()
    })

    test('when user enters a invalid username, there should be an proper status code and error message', async () => {
      const invalidUsername = {
        username: 'invalidUser',
        password: 'fsjkfjksfkjsj'
      }

      const { body } = await appServer
        .post(URL.login)
        .send(invalidUsername)
        .expect(400)

      expect(body).toStrictEqual({
        errors: [
          {
            value: invalidUsername.username,
            msg: 'invalid credentials',
            param: 'username',
            location: 'body'
          },
          {
            value: invalidUsername.password,
            msg: 'invalid credentails',
            param: 'password',
            location: 'body'
          }
        ]
      })
    })

    test('when user enters a invalid password, there should be an proper status code and error message', async () => {
      const { username } = await getInitialUser()
      const invalidPassword = {
        username,
        password: 'fsjkfjksfkjsj'
      }

      const { body } = await appServer
        .post(URL.login)
        .send(invalidPassword)
        .expect(400)

      expect(body).toStrictEqual({
        errors: [
          {
            value: invalidPassword.password,
            msg: 'invalid credentails',
            param: 'password',
            location: 'body'
          }
        ]
      })
    })
  })

  describe('POST /api/auth/sign-up', () => {
    test('works as expected when user sign up with correct credentials', async () => {
      const usersAtStart = await getUsers()

      const newUser: IUser = {
        username: 'New user',
        password: 'newUserPassword',
        todoList: []
      }

      await appServer
        .post(URL.signUp)
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
        .post(URL.signUp)
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
        .post(URL.signUp)
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
        .post(URL.signUp)
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
