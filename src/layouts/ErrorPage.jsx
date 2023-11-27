export default function ErrorPage() {
  return (
    <>
      <h1 className='text-center mt-4'>
        <i className='bi bi-shop'></i> SUDO
      </h1>
      <div className='container-lg mt-5'>
        <div className='row text-gray-700 g-4 text-center'>
          <h1>404</h1>
          <a className='link' aria-current='page' href='/'>
            Back to Home
          </a>
        </div>
      </div>
    </>
  )
}
