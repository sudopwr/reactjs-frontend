import { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'

OrderStatusUpdateDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  order: PropTypes.any.isRequired,
  onStatusUpdate: PropTypes.func.isRequired,
}

export default function OrderStatusUpdateDialog({ show, order, onStatusUpdate } = props) {
  const [orderStatus, setOrderStatus] = useState(undefined)

  useEffect(() => {
    setOrderStatus(order?.status)
  }, [order])

  const handleClose = () => {
    onStatusUpdate(undefined)
  }

  const handleUpdate = () => {
    onStatusUpdate(orderStatus)
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    setOrderStatus(value)
  }

  return (
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Order Status #{order.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className='table'>
          <tbody>
            <tr>
              <td>Customer</td>
              <td>{order?.user_name}</td>
            </tr>
            <tr>
              <td>Product</td>
              <td>{order?.product_name}</td>
            </tr>
            <tr>
              <td>Order Data</td>
              <td>{`${new Date(order?.order_date)}`}</td>
            </tr>
            <tr>
              <td>Order status</td>
              <td>
                <Form.Select name='status' value={orderStatus} onChange={handleSelectChange}>
                  <option value={'order_placed'}>order_placed</option>
                  <option value={'order_confirmed'}>order_confirmed</option>
                  <option value={'order_dispatched'}>order_dispatched</option>
                  <option value={'order_delivered'}>order_delivered</option>
                </Form.Select>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
