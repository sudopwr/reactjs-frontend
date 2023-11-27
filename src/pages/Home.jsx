import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { accountState } from '../store/atoms'
import { makeGetProducts } from '../factories/product'

export default function Home() {
  const [products, setProducts] = useState([])
  const account = useRecoilValue(accountState)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    try {
      setProducts(makeGetProducts())
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='container-lg mt-5'>
      <div className='row text-gray-700 g-4' id='product-list'>
        {products?.length > 0 && products?.map((product) => (
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
              <button className="btn btn-outline-danger"><i className="bi bi-x-circle"></i></button>
              <button className="btn btn-outline-success"><i className="bi bi-pen"></i></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
