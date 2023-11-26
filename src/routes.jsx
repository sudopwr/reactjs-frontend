import { createBrowserRouter } from 'react-router-dom'
import MasterLayout from './layouts/MasterLayout'
import About from './pages/About'
import Login from './pages/Login'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MasterLayout />,
    children: [
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
])
