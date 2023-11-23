import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <>
      <h1 className='text-center mt-4'>
        <i className='bi bi-shop'></i> SUDO
      </h1>
      <nav className='navbar navbar-expand-lg'>
        <div className='container-fluid'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav mx-auto align-item-center'>
              <li className='nav-item active' id='home-nav-item'>
                <a className='nav-link' aria-current='page' href='/'>
                  Home
                </a>
              </li>
              <li className='nav-item' id='about-nav-item'>
                <a className='nav-link' href='/about'>
                  About
                </a>
              </li>
              <li className='nav-item' id='login-nav-item'>
                <a className='nav-link active' href='login.html'>
                  Login
                </a>
              </li>
              <li className='nav-item' id='products-nav-item'>
                <a className='nav-link' href='products.html'>
                  Products
                </a>
              </li>
              <li className='nav-item' id='orders-nav-item'>
                <a className='nav-link active' href='orders.html'>
                  Orders
                </a>
              </li>
              <li className='nav-item' id='logout-nav-item'>
                <a className='nav-link'>Logout</a>
              </li>
              <li className='nav-item' id='user-details-nav-item'>
                <a className='nav-link'>
                  <img
                    id='user-image'
                    className='img-thumbnail rounded-circle w-25 border-red-800-color'
                    alt='img'
                  />
                  <span id='user-name' className='text-red-800-color'></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='container-lg mt-5'>
        <div className='row text-gray-700 g-4'>
          <Outlet />
        </div>
      </div>
    </>
  )
}
