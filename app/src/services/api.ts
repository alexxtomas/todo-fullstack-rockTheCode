const BASE_URL = import.meta.env.DEV ? 'http://localhost:3000/api' : ''

export async function getAllTodo() {
  const response = await fetch(`${BASE_URL}/todo`)
}

export async function getTodoById(id: string) {
  await fetch(`${BASE_URL}/todo/${id}`)
}

export async function createTodo(newTodo: ITodo) {
  await fetch(`${BASE_URL}/todo`)
}

export async function modifyTodoById(id: string, newTodo: ITodo) {
  await fetch(`${BASE_URL}/todo/${id}`)
}

export async function deleteTodoById() {
  await fetch(`${BASE_URL}/todo/${id}`)
}

export async function getAllUsers() {}

export async function login() {}

export async function signUp() {}

export default {
  getAllTodo,
  getTodoById,
  createTodo,
  modifyTodoById,
  deleteTodoById
}
