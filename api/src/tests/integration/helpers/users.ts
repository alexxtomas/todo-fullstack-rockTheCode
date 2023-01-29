import { User } from '../../../models/user.model.js'

export async function getUsers() {
  const users = await User.find()
  console.log(users)
}
