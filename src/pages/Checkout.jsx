import { useRecoilValue } from 'recoil'
import { accountState, checkoutProductState } from '../store/atoms'
import { makePlaceOrder } from '../factories/orders'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const checkoutProductStore = useRecoilValue(checkoutProductState)
  const account = useRecoilValue(accountState)
  const [quantity, setQuantity] = useState('')
  const navigate = useNavigate()

  const placeOrder = async () => {
    try {
      const { accessToken } = account
      const data = {
        product_id: checkoutProductStore.id,
        quantity,
      }
      await makePlaceOrder(accessToken, data)
      navigate('/orders')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='container-md mt-2'>
      <div className='row text-gray-700 g-4'>
        <div className='card text-center'>
          <div className='card-body'>
            <img
              src={checkoutProductStore.image}
              id='p-image'
              className='card-img-top w-25'
              alt='pencil'
            />
            <h5 className='card-title mt-3' id='p-name'>
              {checkoutProductStore.name}
            </h5>
            <p className='card-text' id='p-description'>
              {checkoutProductStore.description}
            </p>
            <h5 className='card-title' id='p-price'>
              <i className='bi bi-currency-rupee'></i> {checkoutProductStore.price}
            </h5>
            <div className='d-flex justify-content-center'>
              <select
                id='quantity'
                className='form-select form-select-lg mb-3 w-25'
                aria-label='.form-select-lg example'
                onChange={(e) => setQuantity(e.target.value)}
              >
                <option>Quantity</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </div>
          </div>
          <div className='card-body'>
            <button className='btn btn-primary' onClick={placeOrder}>
              <i className='bi bi-cart-plus'></i> Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
