import { useEffect, useState } from 'react'
import { getOrders } from '../factories/orders'
import { accountState } from '../store/atoms'
import { useRecoilValue } from 'recoil'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const account = useRecoilValue(accountState)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { accessToken, role } = account
      setOrders(await getOrders(accessToken, role))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='container-md w-50 mt-5'>
      <div className='row'>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody id='table-row'>
            {orders?.length > 0 &&
              orders?.map((order) => (
                <tr>
                  <td>{order.id}</td>
                  <td>{order.order_date}</td>
                  <td>{order.user_name}</td>
                  <td>{order.product_name}</td>
                  <td>{order.quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
