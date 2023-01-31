import bcrypt from 'bcrypt'
export const intialUser = {}

export async function getInitialUser() {
  const passwordHash = await bcrypt.hash('testPassword', 10)
  return {
    username: 'testUser',
    password: passwordHash
  }
}
