import axios from 'axios'
import { decodeJwtResponse } from './utils'

const REACT_BE_SERVER_URL = import.meta.env.REACT_BE_SERVER_URL

export const login = async (jwt) => {
  const response = await axios.post(`${REACT_BE_SERVER_URL}/login`, { jwt })
  const token = response.data.token
  const decodedAccessToken = decodeJwtResponse(token)
  const googleUser = decodeJwtResponse(jwt)
  
  return {
    email: googleUser.email,
    name: googleUser.name,
    image: googleUser.picture,
    accessToken: token,
    decodedAccessToken,
    role: decodedAccessToken.role
  }
}
