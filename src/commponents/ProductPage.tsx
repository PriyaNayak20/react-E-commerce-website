import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface Product {
  id: number
  title: string
  description: string
  price: number
  rating: number
  images: string[]
}
export const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data)
        })
        .catch((error) => {
          console.error(`Error Fetching product data: ${error}`)
        })
    }
  }, [id])

  if (!product) {
    return <h1>Loding...</h1>
  }
  return (
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white rounded"
      >
        Back
      </button>

      <img
        src={product.images[0]}
        alt={product.title}
        className="w-1/4 max-w-xs h-auto mb-"
      />

      <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
      <p className="mb-4 text-gray-700 w-[70%]">{product.description}</p>
      <div className="flex">
        <p>Price : ${product.price}</p>
        <p className="ml-10">Rating: {product.rating}</p>
        <button>Add to cart</button>
      </div>
    </div>
  )
}
