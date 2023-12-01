import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accountState, editProductState } from '../store/atoms'
import { makeGetProducts } from '../factories/product'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [products, setProducts] = useState([])
  const account = useRecoilValue(accountState)
  const [_, setEditProduct] = useRecoilState(editProductState)
  const navigate = useNavigate()

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      setProducts(await makeGetProducts())
    } catch (e) {
      console.error(e)
    }
  }

  const editProduct = async (product) => {
    setEditProduct(product)
    navigate('/product')
  }

  return (
    <div className='container-lg mt-5'>
      <div className='row text-gray-700 g-4' id='product-list'>
        {products?.length > 0 &&
          products?.map((product) => (
            <div className='col-sm-12 col-md-6 col-lg-3' key={product.id}>
              <div className='card text-center' key={product.id}>
                <img src={product.image} className='card-img-top' alt='pencil' />
                <div className='card-body'>
                  <h5 className='card-title'>{product.name}</h5>
                  <p className='card-text'>{product.description}</p>
                  <h5 className='card-title'>
                    <i className='bi bi-currency-rupee'></i> {product.price} /-
                  </h5>
                </div>
                <div className='card-body'>
                  <a href='checkout.html?id=${product.id}' className='btn btn-primary'>
                    <i className='bi bi-cart-plus'></i> Buy
                  </a>
                  &nbsp;
                  <button className='btn btn-outline-danger'>
                    <i className='bi bi-x-circle'></i>
                  </button>
                  &nbsp;
                  <button
                    className='btn btn-outline-success'
                    onClick={() => editProduct(product)}
                  >
                    <i className='bi bi-pen'></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
