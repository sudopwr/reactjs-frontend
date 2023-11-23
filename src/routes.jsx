import { createBrowserRouter } from 'react-router-dom'
import MasterLayout from './layouts/MasterLayout'
import About from './pages/About'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MasterLayout />,
    children: [
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
])
