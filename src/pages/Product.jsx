import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { accountState, editProductState } from '../store/atoms'
import demoImage from '../assets/demoimage.png'
import {
  requiredValidation,
  numberValidation,
  alphabetsSpaceValidation,
} from '../factories/validation'
import { makeAddProduct, makeEditProduct } from '../factories/product'

export default function Product() {
  const account = useRecoilValue(accountState)
  const editProduct = useRecoilValue(editProductState)
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    name: {
      name: 'name',
      value: editProduct?.name || '',
      error: false,
      errorMessage: 'Name is required and numbers not allowed',
      validations: [requiredValidation, alphabetsSpaceValidation],
    },
    price: {
      name: 'price',
      value: editProduct?.price || '',
      error: false,
      errorMessage: 'Price must be number',
      validations: [requiredValidation, numberValidation],
    },
    quantity: {
      name: 'quantity',
      value: editProduct?.quantity || '',
      error: false,
      errorMessage: 'Quantity must be number',
      validations: [requiredValidation],
    },
    description: {
      name: 'description',
      value: editProduct?.description || '',
      error: false,
      errorMessage: 'Description is required',
      validations: [requiredValidation],
    },
    image: {
      value: editProduct?.image || '',
      error: false,
      errorMessage: 'Image is required',
      validations: [],
    },
  })

  const onSubmit = async () => {
    try {
      const { accessToken } = account
      const data = {
        name: product.name.value,
        price: product.price.value,
        quantity: product.quantity.value,
        description: product.description.value,
        image: product.image.value,
      }
      if (editProduct?.id) {
        await makeEditProduct(accessToken, editProduct.id, data)
      } else {
        await makeAddProduct(accessToken, data)
      }
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  function changeImage(input) {
    if (input?.target?.files[0]) {
      const reader = new FileReader()

      reader.onload = function (e) {
        const imageCode = e.target.result
        document.getElementById('demoImage').src = imageCode
        setProduct({
          ...product,
          image: {
            ...product.image,
            value: imageCode,
            error: false,
          },
        })
      }

      reader.readAsDataURL(input?.target?.files[0])
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: {
        ...product[name],
        value,
      },
    })
  }

  const handleSubmit = (e, onSubmit) => {
    e.preventDefault()
    const errors = []
    Object.keys(product).forEach((key) => {
      const validations = product[key].validations
      let noError = true
      validations.forEach((validation) => {
        if (noError === false) return true
        noError = validation(product[key].value)
      })

      if (noError === false) {
        setProduct((product) => ({
          ...product,
          [key]: {
            ...product[key],
            error: true,
          },
        }))

        errors.push({
          name: key,
          error: true,
        })
      } else {
        setProduct((product) => ({
          ...product,
          [key]: {
            ...product[key],
            error: false,
          },
        }))
      }
    })
    return errors.length == 0 ? onSubmit() : false
  }

  return (
    <div className='container-md w-25 mt-5'>
      <div className='row'>
        <div className='d-flex justify-content-center'>
          <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Name
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter product name'
                name={product.name.name}
                id={product.name.name}
                value={product.name.value}
                onChange={handleChange}
              />
              {product.name.error && <div className='text-danger'>{product.name.errorMessage}</div>}
            </div>
            <div className='mb-3'>
              <label htmlFor='price' className='form-label'>
                price
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter product price'
                name={product.price.name}
                id={product.price.name}
                value={product.price.value}
                onChange={handleChange}
              />
              {product.price.error && (
                <div className='text-danger'>{product.price.errorMessage}</div>
              )}
            </div>
            <div className='mb-3'>
              <label htmlFor='quantity' className='form-label'>
                Quantity
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Quantity'
                name={product.quantity.name}
                id={product.quantity.name}
                value={product.quantity.value}
                onChange={handleChange}
              />
              {product.quantity.error && (
                <div className='text-danger'>{product.quantity.errorMessage}</div>
              )}
            </div>
            <div className='mb-3'>
              <label htmlFor='description' className='form-label'>
                Description
              </label>
              <textarea
                className='form-control'
                rows='3'
                name={product.description.name}
                id={product.description.name}
                value={product.description.value}
                onChange={handleChange}
              ></textarea>
              {product.description.error && (
                <div className='text-danger'>{product.description.errorMessage}</div>
              )}
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
                src={product.image.value || demoImage}
                className='w-25 mt-2'
                alt='your image'
              />
              {product.image.error && (
                <div className='text-danger'>{product.image.errorMessage}</div>
              )}
            </div>
            <div className='col-12 d-flex justify-content-center'>
              <button className='btn btn-primary' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
