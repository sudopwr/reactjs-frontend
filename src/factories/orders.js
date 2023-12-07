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
