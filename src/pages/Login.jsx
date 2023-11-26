import { useEffect } from 'react'

export default function Login() {
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '1023493686668-vpnrgtvrqgm7c3bajoj8q463lgktmq78.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    })
    google.accounts.id.renderButton(
      document.getElementById('googleDiv'),
      { theme: 'outline', size: 'large' }, // customization attributes
    )
    google.accounts.id.prompt()
  }, [])

  const handleCredentialResponse = (response) => {
    console.log('Encoded JWT ID token: ' + response.credential)
  }

  return (
    <>
      <div className='container-md w-25 mt-5'>
        <div className='row'>
          <div className='d-flex justify-content-center'>
            <p>Use google secure login!</p>
          </div>
          <div className='d-flex justify-content-center' id='googleDiv'></div>
        </div>
      </div>
    </>
  )
}
