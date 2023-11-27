import { createBrowserRouter } from 'react-router-dom'
import MasterLayout from './layouts/MasterLayout'
import About from './pages/About'
import Login from './pages/Login'
import ErrorPage from './layouts/ErrorPage'
import Home from './pages/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MasterLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
    errorElement: <ErrorPage />
  },
])
