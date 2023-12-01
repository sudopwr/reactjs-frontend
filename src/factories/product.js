import axios from 'axios'

const REACT_BE_SERVER_URL = import.meta.env.REACT_BE_SERVER_URL

export const makeGetProducts = async () => {
  const response = await axios.get(`${REACT_BE_SERVER_URL}/products`)
  return response.data
}

export const makeAddProduct = async (accessToken, data) => {
  const response = await axios.post(`${REACT_BE_SERVER_URL}/products`, data, {
    headers: {
      Authorization : `Bearer ${accessToken}`
    }
  })
  return response
}
