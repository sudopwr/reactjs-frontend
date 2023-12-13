import { useEffect, useState } from 'react'
import { getOrders, makeUpdateOrderStatus } from '../factories/orders'
import { accountState } from '../store/atoms'
import { useRecoilValue } from 'recoil'
import { Button } from 'react-bootstrap'
import OrderStatusUpdateDialog from '../components/orders/OrderStatusUpdateDialog'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const account = useRecoilValue(accountState)
  const [show, setShow] = useState(false)
  const [orderDetails, setOrderDetails] = useState({})

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

  const updateOrderStatus = (order) => {
    setShow(true)
    setOrderDetails(order)
  }

  const handleStatusUpdate = async (status) => {
    if (!status) {
      setShow(false)
      return
    }

    try {
      const { accessToken } = account
      await makeUpdateOrderStatus(accessToken, orderDetails.id, status)
      await fetchOrders()
      alert(`Order successfully updated to ${status}`)
    } catch (e) {
      console.error(e)
    } finally {
      setShow(false)
    }
  }

  return (
    <div className='container-md mt-5'>
      <div className='row'>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody id='table-row'>
            {orders?.length > 0 &&
              orders?.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{`${new Date(order.order_date)}`}</td>
                  <td>{order.user_name}</td>
                  <td>{order.product_name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>
                  <td>
                    <Button variant='primary' onClick={() => updateOrderStatus(order)}>
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <OrderStatusUpdateDialog
        show={show}
        order={orderDetails}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  )
}
