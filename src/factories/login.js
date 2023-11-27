import axios from 'axios'
import { decodeJwtResponse } from './utils'

const REACT_BE_SERVER_URL = import.meta.env.REACT_BE_SERVER_URL

export let AccessToken = ''
export let Role = ''
export let decodedAccessToken = ''

export const login = async (jwt) => {
  const response = await axios.post(`${REACT_BE_SERVER_URL}/login`, { jwt })
  const token = response.data.token
  AccessToken = token
  decodedAccessToken = decodeJwtResponse(token)
  Role = decodedAccessToken.role
}

export const getAccessToken = () => {
  return AccessToken
}

export const getRole = () => {
  return Role
}

export const getDecodedAccessToken = () => {
  return decodedAccessToken
}
