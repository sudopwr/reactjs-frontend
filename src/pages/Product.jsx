import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { accountState, editProductState } from '../store/atoms'
import demoImage from '../assets/demoimage.png'
import { makeAddProduct, makeEditProduct } from '../factories/product'

export default function Product() {
  const account = useRecoilValue(accountState)
  const [editProduct, setEditProduct] = useRecoilState(editProductState)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: editProduct?.name || '',
      quantity: editProduct?.quantity || '',
      price: editProduct?.price || '',
      description: editProduct?.description || '',
    },
  })
  const [image, setImage] = useState({
    value: editProduct?.image || '',
    error: false
  })

  const onSubmit = async (data) => {
    try {
      const { accessToken } = account
      if (editProduct?.id) {
        await makeEditProduct(accessToken, editProduct.id, { ...data, image: image.value })
        setEditProduct({})
      } else {
        await makeAddProduct(accessToken, { ...data, image: image.value })
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
        setImage({
          value: imageCode,
          error: false
        })
      }

      reader.readAsDataURL(input?.target?.files[0])
    }
  }

  return (
    <div className='container-md w-25 mt-5'>
      <div className='row'>
        <div className='d-flex justify-content-center'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Name*
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter product name'
                {...register('name', { required: true })}
              />
              {errors.name && <div className='text-danger'>Name is required</div>}
            </div>
            <div className='mb-3'>
              <label htmlFor='price' className='form-label'>
                Price*
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter product price'
                {...register('price', { required: true })}
              />
              {errors.price && <div className='text-danger'>Price is required</div>}
            </div>
            <div className='mb-3'>
              <label htmlFor='quantity' className='form-label'>
                Quantity*
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Quantity'
                {...register('quantity', { required: true })}
              />
              {errors.quantity && <div className='text-danger'>Quantity is required</div>}
            </div>
            <div className='mb-3'>
              <label htmlFor='description' className='form-label'>
                Description*
              </label>
              <textarea
                className='form-control'
                rows='3'
                {...register('description', { required: true })}
              ></textarea>
              {errors.description && <div className='text-danger'>Description is required</div>}
            </div>
            <div className='mb-3'>
              <label htmlFor='productImage' className='form-label'>
                Product image*
              </label>
              <input
                className='form-control form-control-sm'
                onChange={changeImage}
                id='productImage'
                type='file'
              />
              <img alt='product' id='demoImage' src={image.value || demoImage} className='w-25 mt-2' />
              {image.error && <div className='text-danger'>Image is required</div>}
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
