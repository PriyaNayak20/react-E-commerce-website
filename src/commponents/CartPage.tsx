import { useCart } from './CartContext'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
  const navigate = useNavigate()
  const { cartItems, addToCart, removeFromCart } = useCart()

  const handleIncreaseQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id)
    if (item) {
      addToCart(item)
    }
  }

  const handleDecreaseQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id)
    if (item && item.quantity > 1) {
      removeFromCart(id)
    }
  }

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white rounded"
      >
        Back
      </button>

      <h1 className="text-2xl mb-4 font-bold">Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="mb-4">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p>Price: ${item.price}</p>
              <div className="flex items-center">
                <button
                  onClick={() => handleDecreaseQuantity(item.id)}
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  -
                </button>
                <p className="mx-2">{item.quantity}</p>
                <button
                  onClick={() => handleIncreaseQuantity(item.id)}
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <h2 className="text-xl font-bold mt-4">Total: ${totalAmount}</h2>
        </div>
      )}
    </div>
  )
}

export default CartPage
