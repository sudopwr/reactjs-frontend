import { createBrowserRouter } from 'react-router-dom'
import MasterLayout from './layouts/MasterLayout'
import About from './pages/About'
import Login from './pages/Login'
import ErrorPage from './layouts/ErrorPage'
import Home from './pages/Home'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'

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
        path: 'product',
        element: <Product />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
    errorElement: <ErrorPage />,
  },
])
