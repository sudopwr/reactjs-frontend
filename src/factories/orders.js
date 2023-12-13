import axios from 'axios'

const REACT_BE_SERVER_URL = import.meta.env.REACT_BE_SERVER_URL

export const makePlaceOrder = async (accessToken, data) => {
  const response = await axios.post(`${REACT_BE_SERVER_URL}/orders`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response
}

export const getOrders = async (accessToken, role) => {
  let url = `${REACT_BE_SERVER_URL}/orders/user`
  if (role === 'admin') {
    url = `${REACT_BE_SERVER_URL}/orders`
  }

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.data
}

export const makeUpdateOrderStatus = async (accessToken, id, status) => {
  const response = await axios.put(`${REACT_BE_SERVER_URL}/orders/${id}`, { status }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response
}
