import { decodeJwtResponse } from './utils'

const REACT_BE_SERVER_URL = import.meta.env.REACT_BE_SERVER_URL

export let AccessToken = ''
export let Role = ''

export const login = async (jwt) => {
  try {
    const response = await axios.post(`${REACT_BE_SERVER_URL}/login`, { jwt })
    const token = response.data.token
    AccessToken = token
    Role = decodeJwtResponse(token).role
  } catch (error) {
    return error
  }
}
