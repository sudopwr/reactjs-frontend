import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { accountState } from '../store/atoms'
import { useEffect } from 'react'

export default function MasterLayout() {
  const [account, setAccount] = useRecoilState(accountState)
  const navigate = useNavigate()

  useEffect(() => {
    if (!account.email) {
      navigate('/')
    }
  }, [])

  const logout = () => {
    setAccount(undefined)
    navigate('/login')
  }

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
                <Link className='nav-link' aria-current='page' to='/'>
                  Home
                </Link>
              </li>
              <li className='nav-item' id='about-nav-item'>
                <Link className='nav-link' to='/about'>
                  About
                </Link>
              </li>

              {account?.email ? (
                <>
                  {account.role === 'admin' && (
                    <li className='nav-item' id='products-nav-item'>
                      <Link className='nav-link' to='/product'>
                        Products
                      </Link>
                    </li>
                  )}
                  <li className='nav-item' id='orders-nav-item'>
                    <Link className='nav-link active' to='/orders'>
                      Orders
                    </Link>
                  </li>
                  <li className='nav-item' id='logout-nav-item'>
                    <Link className='nav-link' onClick={logout}>
                      Logout
                    </Link>
                  </li>
                  <li className='nav-item' id='user-details-nav-item'>
                    <Link className='nav-link'>
                      <img
                        id='user-image'
                        className='img-thumbnail rounded-circle w-25 border-red-800-color'
                        alt='img'
                        src={account.image}
                      />
                      <span id='user-name' className='text-red-800-color'></span>
                    </Link>
                  </li>
                </>
              ) : (
                <li className='nav-item' id='login-nav-item'>
                  <Link className='nav-link active' to='/login'>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}
