import axios from 'axios'

const REACT_BE_SERVER_URL = import.meta.env.REACT_BE_SERVER_URL

export const makeGetProducts = async () => {
  const response = await axios.get(`${REACT_BE_SERVER_URL}/products`)
  return response.data
}

export const makeAddProduct = async (accessToken, data) => {
  const response = await axios.post(`${REACT_BE_SERVER_URL}/products`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response
}

export const makeEditProduct = async (accessToken, id, data) => {
  const response = await axios.put(`${REACT_BE_SERVER_URL}/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response
}

export const makeDeleteProduct = async (accessToken, id) => {
  const response = await axios.delete(`${REACT_BE_SERVER_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response
}
