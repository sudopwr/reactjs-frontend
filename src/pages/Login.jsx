import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { login } from '../factories/login'
import { accountState } from '../store/atoms'

export default function Login() {
  const [ _, setAccount ] = useRecoilState(accountState)

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.REACT_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    })
    google.accounts.id.renderButton(
      document.getElementById('googleDiv'),
      { theme: 'outline', size: 'large' }, // customization attributes
    )
    google.accounts.id.prompt()
  }, [])

  const handleCredentialResponse = async (response) => {
    console.log('Encoded JWT ID token: ' + response.credential)
    try {
      const loginResponse = await login(response.credential)
      setAccount(loginResponse)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='container-md w-25 mt-5'>
      <div className='row'>
        <div className='d-flex justify-content-center'>
          <p>Use google secure login!</p>
        </div>
        <div className='d-flex justify-content-center' id='googleDiv'></div>
      </div>
    </div>
  )
}
