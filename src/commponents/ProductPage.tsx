import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from './CartContext'
import 'react-toastify/dist/ReactToastify.css'

interface Product {
  id: number
  title: string
  description: string
  price: number
  rating: number
  images: string[]
  quantity: number
}

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const { cartItems, addToCart, removeFromCart } = useCart()

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

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
      toast.success('Item added to cart!')
    }
  }

  const handleRemoveFromCart = () => {
    if (product) {
      removeFromCart(product.id)
      toast.info('Item removed from cart!')
    }
  }

  const isInCart = product && cartItems.some((item) => item.id === product.id)

  if (!product) {
    return <h1>Loading...</h1>
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
      </div>

      <button
        onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
        className="mt-5 px-4 py-2 bg-black text-white rounded"
      >
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
  )
}
