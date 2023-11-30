import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { accountState } from '../store/atoms'
import { makeGetProducts } from '../factories/product'
import demoImage from '../assets/demoimage.png'

export default function Product() {
  const account = useRecoilValue(accountState)
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    quantity: 0,
    decription: '',
    image: '',
  })

  const onSubmit = () => {
    try {
      console.log(product)
    } catch (e) {
      console.error(e)
    }
  }

  function changeImage(input) {
    if (input?.target?.files[0]) {
      const reader = new FileReader()
      
      reader.onload = function (e) {
        const imageCode = e.target.result
        document.getElementById('demoImage').src = e.target.result
        setProduct({
          ...product,
          image: imageCode,
        })
      }

      reader.readAsDataURL(input?.target?.files[0])
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setProduct({
      ...product,
      [name]: value,
    })
  }

  return (
    <div className='container-md w-25 mt-5'>
      <div className='row'>
        <div className='d-flex justify-content-center'>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Name
              </label>
              <input
                type='text'
                name='name'
                required
                className='form-control'
                id='name'
                placeholder='Enter product name'
                value={product.name}
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='price' className='form-label'>
                price
              </label>
              <input
                type='number'
                name='price'
                required
                className='form-control'
                id='price'
                placeholder='100.00'
                value={product.price}
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='quantity' className='form-label'>
                Quantity
              </label>
              <input
                type='number'
                name='quantity'
                required
                className='form-control'
                id='quantity'
                placeholder='Enter Quantity'
                value={product.quantity}
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='description' className='form-label'>
                Description
              </label>
              <textarea
                className='form-control'
                name='description'
                id='description'
                rows='3'
                value={product.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className='mb-3'>
              <label htmlFor='productImage' className='form-label'>
                Product image
              </label>
              <input
                className='form-control form-control-sm'
                onChange={changeImage}
                id='productImage'
                type='file'
              />
              <img
                id='demoImage'
                src={product.image || demoImage}
                className='w-25 mt-2'
                alt='your image'
              />
            </div>
            <div className='col-12 d-flex justify-content-center'>
              <button className='btn btn-primary' type='submit' onClick={onSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
