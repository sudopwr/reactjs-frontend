import axios from 'axios'

const REACT_BE_SERVER_URL = import.meta.env.REACT_BE_SERVER_URL

export const makeGetProducts = async (accessToken) => {
  const response = await axios.get(`${REACT_BE_SERVER_URL}/products`)
  return response.data
}
