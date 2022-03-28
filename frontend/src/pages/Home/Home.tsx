import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import './home.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
function Home(): JSX.Element {
  const [products, setProducts] = useState<IProductInfo[]>([])
  const [selectedProduct, setSelectedProduct] = useState<number>(0)
  const navigate = useNavigate()
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/getProducts',
    })
      .then((repos) => {
        const result = repos.data.result as IProductInfo[]
        setProducts(result)
        setSelectedProduct(result[0].id)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }, [])
  useMemo(() => {
    return selectedProduct !== 0 ? navigate(`view-review/:${selectedProduct}`, { replace: true }) : null
  }, [selectedProduct])
  return (
    <div className="container">
      <div style={{ width: '100%' }}>
        <h3>Product List</h3>
        <ul>
          {products.length !== 0
            ? products.map((item) => {
                return (
                  <li key={`product:${item.id}`}>
                    <Link
                      to={`view-review/:${item.id.toString()}`}
                      onClick={() => {
                        setSelectedProduct(item.id)
                      }}
                    >
                      <div className={`product-item`}>{item.name}</div>
                    </Link>
                  </li>
                )
              })
            : null}
        </ul>
        <hr />
      </div>
      <Outlet context={[selectedProduct, products]} />
    </div>
  )
}

export default Home
