import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PageLayout from './components/layouts/PageLayout'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import './styles/global.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,

    errorElement: <Error />
  },
  {
    path: '/auth/login',
    element: <Login />
  },
  {
    path: '/auth/sign-up',
    element: <SignUp />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PageLayout title="Todo List 🚀">
      <RouterProvider router={router} />
      {/* <App /> */}
    </PageLayout>
  </React.StrictMode>
)
